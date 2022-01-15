const {
    createUser,
    getUserList,
    changePassword,
    editUser,
    deleteUser,
    getUserProfile
} = require("./users")

const {login, register, getLoginPage, getRegisterPage} = require("./auth")

const {test, testUnsuccess, testSuccess} = require('./custom')

const {
    getProductByName,
    addGroupProduct,
    cleanGroup,
    deleteGroupProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} = require('./products')

module.exports = {
    editUser,
    deleteUser,
    getUserList,
    changePassword,
    login,
    getProductByName,
    addGroupProduct,
    cleanGroup,
    deleteGroupProduct,
    getProducts,
    createProduct,
    updateProduct,
    register,
    createUser,
    deleteProduct,
    getLoginPage,
    getRegisterPage,
    getUserProfile,
    test,
    testUnsuccess,
    testSuccess
}
