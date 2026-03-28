import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
});

export const OrderItemModel = mongoose.model("OrderItem", OrderItemSchema);
