import type { NextFunction, Request, Response } from "express";
import AuthService from "../services/AuthService";

export const authController = {
    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, phone, password, email } = req.body;

            const data = await AuthService.register(name, phone, password, email);

            res.cookie("refreshToken", data.tokens.refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            });

            return res.status(201).json({
                data: data.user,
                accessToken: data.tokens.accessToken,
            });
        } catch (e) {
            next(e);
        }
    },
    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            const data = await AuthService.login(email, password);

            res.cookie("refreshToken", data.tokens.refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            });

            return res.status(200).json({
                user: data.user,
                accessToken: data.tokens.accessToken,
            });
        } catch (e) {
            next(e);
        }
    },
    logout: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken } = req.cookies;
            const token = AuthService.logout(refreshToken);

            res.clearCookie("refreshToken");

            res.status(200).json(token);
        } catch (e) {
            next(e);
        }
    },
    refresh: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken } = req.cookies;
            const data = await AuthService.refresh(refreshToken);

            res.cookie("refreshToken", data.tokens.refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            });

            res.status(200).json({
                user: data.user,
                accessToken: data.tokens.accessToken,
            });
        } catch (e) {
            next(e);
        }
    },
    activate: async (req: Request, res: Response, next: NextFunction) => {
        try {
        } catch (e) {
            next(e);
        }
    },
};
