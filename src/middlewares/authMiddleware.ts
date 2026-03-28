import type { NextFunction, Request, Response } from "express";
import TokenService from "../services/TokenService";
import ApiError from "../utils/exeptions/ApiError";
import type { UserRequest } from "../types/userRequest";

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw ApiError.UnAuthorized();

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res
            .status(401)
            .json({ message: "Формат токена неверный или токен отсутствует" });
    }

    try {
        const userData = await TokenService.validateAccessToken(token);
        if (!userData) {
            return res.status(401).json({ message: "Невалидный токен" });
        }

        req.user = userData as UserRequest;

        next();
    } catch (e) {
        return res.status(401).json({ message: "Невалидный токен" });
    }
};
