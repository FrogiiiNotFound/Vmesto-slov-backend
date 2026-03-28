import { UserRequest } from "./src/types/userRequest";

declare global {
  namespace Express {
    interface Request {
      user?: UserRequest;
    }
  }
}

export {};
