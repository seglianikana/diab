const {
    model,
    Schema
} = require("mongoose");

const GroupProductsSchema = new Schema(
    {
        item: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Product"
        },
        mass:
            {
                type: Number,
                required: true,
                default: 0
            }
        ,
    },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = model("GroupProducts", GroupProductsSchema);
