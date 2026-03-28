import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        images: {
            type: Array,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        discount_percent: {
            type: Number,
        },
        rating: {
            type: Number,
        },
        reviews: {
            type: Number,
        },
        composition: {
            type: Array,
        },
        tags: {
            type: Array,
        },
        category: {
            type: String,
            required: true,
        },
        inStock: {
            type: Boolean,
        },
    },
    { timestamps: true },
);

export const ProductModel = mongoose.model("Product", ProductSchema);
