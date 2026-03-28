import { Router } from "express";
import { userController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const userRouter = Router();

userRouter.use(authMiddleware);

userRouter.get("/user", userController.getUser);
userRouter.patch("/user", userController.changeUserInfo);

userRouter.get("/user/orders", userController.getUserOrders);
userRouter.get("/user/orders/:orderId", userController.getUserOrder);
userRouter.post("/user/orders", userController.addOrder);

userRouter.get("/user/favourites", userController.getUserFavourites);
userRouter.post("/user/favourites", userController.addFavourite);
userRouter.delete("/user/favourites/:itemId", userController.deleteFavourite);

userRouter.get("/user/addresses", userController.getAddresses);
userRouter.post("/user/addresses", userController.addAddress);
userRouter.delete("/user/addresses/:index", userController.deleteAddress);

export default userRouter;
