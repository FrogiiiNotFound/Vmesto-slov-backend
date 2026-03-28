import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import { fromZodError } from "zod-validation-error";
import ApiError from "../utils/exeptions/ApiError";

export const validate =
    <T>(schema: ZodType<T>) =>
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            throw ApiError.BadRequest(
                "Неправильные данные",
                fromZodError(result.error),
            );
        }

        next();
    };
