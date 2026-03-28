import mongoose from "mongoose";
import { ProductModel } from "../models/ProductModel";
import type { FilterParams } from "../types/productFilters";
import ApiError from "../utils/exeptions/ApiError";

export class ProductsService {
    static async getProducts(
        limit: number,
        offset: number,
        filters?: FilterParams,
    ) {
        const query: any = {};

        if (filters?.category && filters.category !== "all") {
            query.category = filters.category;
        }

        if (filters?.priceFrom || filters?.priceTo) {
            query.price = {};
            if (filters.priceFrom) query.price.$gte = Number(filters.priceFrom);
            if (filters.priceTo) query.price.$lte = Number(filters.priceTo);
        }

        if (filters?.composition) {
            query.$and = filters.composition.split(",").map((val) => ({
                $or: [
                    { name: { $regex: val, $options: "i" } },
                    { description: { $regex: val, $options: "i" } },
                ],
            }));
        }

        if (filters?.tags) {
            query.tags = {
                $in: filters.tags.split(",").map((t) => new RegExp(t, "i")),
            };
        }

        if (filters?.q) {
            query.$or = [
                { name: { $regex: filters.q, $options: "i" } },
                { description: { $regex: filters.q, $options: "i" } },
            ];
        }

        const totalCount = await ProductModel.countDocuments(query);

        const products = await ProductModel.find(query)
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit);

        return {
            totalCount,
            products,
        };
    }
    static async getProductById(productId: string) {
        const product = await ProductModel.findOne({ _id: productId });
        if (!product) throw ApiError.NotFound("Товар не найден или был удален");

        return product;
    }
}

export default ProductsService;
