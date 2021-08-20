import { Router } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authMiddleware from "./middlewares/auth";
import adminsOnly from "./middlewares/admin";
import UserController from "./controllers/UserController";
import SessionController from "./controllers/SessionController";

const routes = Router();

routes.use(cookieParser());
routes.use(cors({ credentials: true, origin: "http://localhost:3000" }));

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

routes.use(authMiddleware);

routes.get("/sessions", SessionController.index);
routes.delete("/sessions", SessionController.delete);

routes.get("/users", UserController.index);
routes.put("/users", UserController.update);
routes.put("/admin/users", adminsOnly, UserController.adminUpdate);

export default routes;
