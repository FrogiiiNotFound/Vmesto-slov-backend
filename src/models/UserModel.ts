import mongoose from "mongoose";
export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    addresses: {
        type: Array,
    },
    favourites: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
    },
    bonus_amount: {
        type: Number,
        default: 0,
    },
});

export const UserModel = mongoose.model("User", UserSchema);
