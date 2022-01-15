const {
    model,
    Schema
} = require("mongoose");

const ProductSchema = new Schema(
    {
        id:{
          type:Number,
          index:true,
          required:true,
          unique:true,
        },
        name: {
            type: String,
            unique: true,
            required: true
        },
        value: {
            type: Number,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = model("Product", ProductSchema);
