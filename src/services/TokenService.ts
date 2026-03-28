import type mongoose from "mongoose";
import { TokenModel } from "../models/TokenModel";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "./../config/constants";
import jwt from "jsonwebtoken";

export class TokenService {
    static generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
            expiresIn: "30m",
        });
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
            expiresIn: "30d",
        });

        return { accessToken, refreshToken };
    }

    static async saveToken(
        userId: mongoose.Types.ObjectId,
        refreshToken: string,
    ) {
        const tokenData = await TokenModel.findOne({ user_id: userId });
        if (tokenData) {
            tokenData.refresh_token = refreshToken;
            return tokenData.save();
        }

        const token = await TokenModel.create({
            user_id: userId,
            refresh_token: refreshToken,
        });

        return token;
    }

    static async findToken(refreshToken: string) {
        const token = await TokenModel.findOne({ refresh_token: refreshToken });

        return token;
    }

    static async deleteToken(refreshToken: string) {
        const deletedToken = await TokenModel.deleteOne({
            refresh_token: refreshToken,
        });

        return deletedToken;
    }

    static async validateRefreshToken(token: string) {
        try {
            return jwt.verify(token, JWT_REFRESH_SECRET);
        } catch {
            return null;
        }
    }

    static async validateAccessToken(token: string) {
        try {
            return jwt.verify(token, JWT_ACCESS_SECRET);
        } catch {
            return null;
        }
    }
}

export default TokenService;
