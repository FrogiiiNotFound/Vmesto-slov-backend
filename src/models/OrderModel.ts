import mongoose from "mongoose";
import { OrderStatus } from "../types/orderStatus";

const OrderSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
        },
        total_price: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(OrderStatus),
            default: OrderStatus.CONFIRMED,
        },
        delivery_date: {
            type: String,
            required: true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true },
);

export const OrderModel = mongoose.model("Order", OrderSchema);
