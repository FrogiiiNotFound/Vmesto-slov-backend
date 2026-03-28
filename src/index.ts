import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { CLIENT_URL, DB_URL, PORT } from "./config/constants";
import router from "./routes/index";
import { errorHandler } from "./middlewares/errorMiddleware";

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const allowedOrigins = (CLIENT_URL || "")
        .split(",")
        .map((o) => o.trim())
        .filter(Boolean);

      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
  }),
);
app.use(cookieParser());
app.use("/api/v1", router);
app.use(errorHandler);

const startServer = async () => {
  try {
    await mongoose.connect(DB_URL as string);
    console.log("Connected to database");

    app.listen(PORT, () => {
      console.log(`Server started at PORT ${PORT}`);
    });
  } catch (e) {
    console.log("Startup error:", e);
    process.exit(1);
  }
};

startServer();
