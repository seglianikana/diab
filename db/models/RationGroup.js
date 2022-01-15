const {
    model,
    Schema
} = require("mongoose");

const RationGroup = new Schema(
    {
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: "GroupProduct"
            }
        ],
    },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = model("RationGroup", RationGroup);
