const asyncHandler = require("express-async-handler");
const {
    Product,
    User,
    GroupProduct,
    RationGroup
} = require("../db/models/index");


const getProductByName = async (req, res, next) => {
    const {name, mass} = req.body
    const product = await Product.findOne({name})
        .orFail()

    req.data = {product: product.name, value: product.value * mass}
    next()
}

const addGroupProductToRation = async (req, res,next) => {
    const {user: {email}, product, mass} = req.body
    const user = await User.findOne({email})

    user || next(new Error("user not found"))

    const productExists = await Product.findOne({name: product})
    if (!productExists) next(new Error("product not found"))

    const groupProduct = await GroupProduct.create({item: productExists.objectId, mass})
    const rationGroup = await RationGroup.updateOne({ownerId: user.objectId}, {$push: {products: {$each: [groupProduct]}}})
    res.send({rationGroup})
}

const deleteGroupProductFromRation = async (req, res,next) => {
    const {user: {email}, product_id} = req.body

    const user = await User.findOne({email})

    user || next(new Error("user not found"))

    const groupProduct = await GroupProduct.findOne({objectId: product_id})
    groupProduct || next(new Error("Specified product already doesn't exist in your ration"))

    await RationGroup.updateOne({ownerId: user.objectId}, {$pop: {products: {$each: [groupProduct]}}})
    await GroupProduct.delete(groupProduct)
    res.send("The product has been successfully removed from your ration")

}

const deleteAllRationProducts = async (req,res, next) =>{
    const {user: {email}} = req.body
    const user = await User.findOne({email})

    user || next(new Error("user not found"))

    const groupProducts = await GroupProduct.find({ownerId:user._id})

    await RationGroup.updateOne({ownerId: user.objectId}, {$pop: {products: {$each: groupProducts}}})

    await GroupProduct.deleteMany(groupProducts)
    res.send("All products have been removed from your ration")
}

const getProducts = async (req, res) => {
    const products = await Product.find()

    res.send(products);
};

const create = async (req, res, next) => {
    const product = await Product.findOne({objectId: req.body.product_id})
    !product || next(new Error("product with specified name already exists"))
    const createdProduct = await Product.create({
        name: req.body.product,
        value: req.body.value,
        id: await Product.countDocuments()
    })

    res.send(createdProduct)

}

const update = async (req, res, next) => {
    const {product, value, product_id} = req.body
    product || next(new Error("name should be specified for product modifying"))
    const updatedProduct = await Product.findOneAndUpdate(
        {objectId: product_id},
        {...req.body},
        {
            new: true,
            upsert: true
        }
    )

    res.send(updatedProduct);
}

const deleteProduct = async (req, res, next) => {

    const {product, product_id} = req.body
    product || next(new Error("name should be specified for product modifying"))

    await Product.findOneAndDelete(
        {objectId: product_id},
    )

    res.send("The product has been successfully deleted")
}

module.exports = {
    getProductByName: asyncHandler(getProductByName),
    addGroupProduct: asyncHandler(addGroupProductToRation),
    getProducts: asyncHandler(getProducts),
    cleanGroup: asyncHandler(deleteAllRationProducts),
    deleteGroupProduct:asyncHandler(deleteGroupProductFromRation),
    createProduct: asyncHandler(create),
    updateProduct: asyncHandler(update),
    deleteProduct: asyncHandler(deleteProduct),
};
