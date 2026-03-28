import type { NextFunction, Request, Response } from "express";
import ProductsService from "../services/ProductsService";
import type { FilterQuery } from "../types/productFilters";

export const productsController = {
    getProducts: async (
        req: Request<{}, {}, {}, FilterQuery>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const filters = {
                category: req.query.category,
                priceFrom: req.query.priceFrom,
                priceTo: req.query.priceTo,
                composition: req.query.composition,
                tags: req.query.tags,
                q: req.query.q,
            };
            const page = Number(req.query.page) || 1;
            const limit = 12;
            const offset = (page - 1) * limit;
            const products = await ProductsService.getProducts(
                limit,
                offset,
                filters,
            );

            return res.status(200).json({ page, data: products });
        } catch (e) {
            next(e);
        }
    },
    getProductbyId: async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { id } = req.params;
            const product = await ProductsService.getProductById(id);

            return res.status(200).json({ data: product });
        } catch (e) {
            next(e);
        }
    },
};
