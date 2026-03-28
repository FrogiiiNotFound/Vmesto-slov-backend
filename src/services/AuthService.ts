import TokenService from "./TokenService";
import bcrypt from "bcrypt";
import { UserModel } from "../models/UserModel";
import ApiError from "../utils/exeptions/ApiError";
import UserDto from "../utils/dtos/UserDto";
import type { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

class AuthService {
    async register(name: string, phone: string, password: string, email: string) {
        const candidate = await UserModel.findOne({ phone });
        if (candidate) {
            throw ApiError.BadRequest(
                "Пользователь с таким номером уже существует",
            );
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = await UserModel.create({
            name,
            phone,
            email,
            password: hashedPassword,
        });

        const data = await this.updateUser(user);

        return data;
    }

    async login(email: string, password: string) {
        const user = await UserModel.findOne({ email });
        if (!user) throw ApiError.NotFound("Пользователь не найден");

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) throw ApiError.BadRequest("Неправильный пароль");

        const data = await this.updateUser(user);

        return data;
    }

    async logout(refreshToken: string) {
        const deletedToken = TokenService.deleteToken(refreshToken);
        return deletedToken;
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) throw ApiError.UnAuthorized();

        const userToken = await TokenService.findToken(refreshToken);
        const userData = await TokenService.validateRefreshToken(
            refreshToken,
        ) as JwtPayload;

        if (!userToken || !userData) throw ApiError.UnAuthorized();

        const user = await UserModel.findOne({ _id: userData.user_id });

        const data = await this.updateUser(user);

        return data;
    }

    private async updateUser(user: any) {
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ ...userDto });

        const userId = new mongoose.Types.ObjectId(userDto.user_id);

        await TokenService.saveToken(userId, tokens.refreshToken);

        return {
            user: userDto,
            tokens,
        };
    }
}

export default new AuthService();
