import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const CLIENT_URL = (process.env.CLIENT_URL || "http://localhost:5173") as string;
export const DB_URL = process.env.DB_URL as string;

// Provide dev defaults so auth endpoints don't crash if env vars are missing.
export const JWT_ACCESS_SECRET = (process.env.JWT_ACCESS_SECRET || "dev-access-secret") as string;
export const JWT_REFRESH_SECRET = (process.env.JWT_REFRESH_SECRET || "dev-refresh-secret") as string;
