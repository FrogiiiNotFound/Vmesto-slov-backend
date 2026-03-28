import type { NextFunction, Request, Response } from "express";
import UsersService from "../services/UsersService";

export const userController = {
    getUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.user_id;

            const user = await UsersService.getUser(userId);

            return res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    },
    getUserOrders: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.user_id;
            const page = Number(req.query.page) || 1;
            const limit = 3;
            const offset = (page - 1) * limit;

            const { orders, totalCount } = await UsersService.getUserOrders(
                userId,
                limit,
                offset,
            );

            return res.status(200).json({ page, totalCount, data: orders });
        } catch (e) {
            next(e);
        }
    },
    getUserOrder: async (
        req: Request<{ orderId: string }>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { orderId } = req.params;
            const userId = req.user!.user_id;

            const order = await UsersService.getUserOrder(orderId, userId);

            return res.status(200).json(order);
        } catch (e) {
            next(e);
        }
    },
    changeUserInfo: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const userId = req.user!.user_id;

            const updatedUser = UsersService.changeUserInfo(data, userId);

            return res.status(200).json(updatedUser);
        } catch (e) {
            next(e);
        }
    },
    getUserFavourites: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.user_id;
            const favourites = await UsersService.getUserFavourites(
                userId,
            );

            return res.status(200).json(favourites);
        } catch (e) {
            next(e);
        }
    },
    addFavourite: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { itemId } = req.body;
            const userId = req.user!.user_id;

            const favourites = await UsersService.addFavourite(itemId, userId);

            return res.status(200).json(favourites);
        } catch (e) {
            next(e);
        }
    },
    deleteFavourite: async (
        req: Request<{ itemId: string }>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { itemId } = req.params;
            const userId = req.user!.user_id;

            const favourites = await UsersService.deleteFavourite(userId, itemId);

            return res.status(200).json(favourites);
        } catch (e) {
            next(e);
        }
    },

    addOrder: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { address, total_price, delivery_date, items } = req.body;
            const userId = req.user!.user_id;

            const order = await UsersService.addOrder(userId, address, total_price, delivery_date, items);

            return res.status(201).json(order);
        } catch (e) {
            next(e);
        }
    },

    changeNickname: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { nickname } = req.body;
            const userId = req.user!.user_id;

            const userData = UsersService.changeNickname(nickname, userId);

            return res.status(200).json(userData);
        } catch (e) {
            next(e);
        }
    },

    changePassword: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { newPassword, oldPassword } = req.body;
            const userId = req.user!.user_id;

            await UsersService.changePassword(userId, newPassword, oldPassword);

            return res.status(200).json({ message: "Пароль успешно изменен" });
        } catch (e) {
            next(e);
        }
    },

    getAddresses: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.user_id;

            const addresses = await UsersService.getAddresses(userId);

            return res.status(201).json(addresses);
        } catch (e) {
            next(e);
        }
    },

    addAddress: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { address } = req.body;
            const userId = req.user!.user_id;

            const addresses = await UsersService.addAddress(address, userId);

            return res.status(201).json(addresses);
        } catch (e) {
            next(e);
        }
    },

    deleteAddress: async (
        req: Request<{ index: number }>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { index } = req.params;
            const userId = req.user!.user_id;

            const addresses = await UsersService.deleteAddress(userId, index);

            return res.status(200).json(addresses);
        } catch (e) {
            next(e);
        }
    },
};
