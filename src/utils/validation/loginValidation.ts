import z from "zod";

export const LoginSchema = z.object({
    email: z.string().trim(),
    password: z
        .string()
        .min(3, "Пароль должен быть не менее 6 символов")
        .max(20, "Пароль должен быть не более 20 символов"),
});

export type Register = z.infer<typeof LoginSchema>;
