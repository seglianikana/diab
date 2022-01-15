const {
    model,
    Schema
} = require("mongoose");

const UserSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: [
                "admin",
                "user"
            ],
            default: "user"
        },
        rationGroup: {
            type: Schema.Types.ObjectId,
            ref: "RationGroup",
            required: true
        },
        deleted: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = model("User", UserSchema);
