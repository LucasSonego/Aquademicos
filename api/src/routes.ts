import { Router } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authMiddleware from "./middlewares/auth";
import adminsOnly from "./middlewares/admin";
import UserController from "./controllers/UserController";
import SessionController from "./controllers/SessionController";
import SchoolClassController from "./controllers/SchoolClassController";

const routes = Router();

routes.use(cookieParser());
routes.use(cors({ credentials: true, origin: "http://localhost:3000" }));

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);
routes.get("/school_classes_public", SchoolClassController.publicIndex);

routes.use(authMiddleware);

routes.get("/sessions", SessionController.index);
routes.delete("/sessions", SessionController.delete);

routes.get("/users", UserController.index);
routes.put("/users", UserController.update);
routes.put("/admin/users", adminsOnly, UserController.adminUpdate);

routes.post("/school_classes", adminsOnly, SchoolClassController.store);
routes.get("/school_classes", adminsOnly, SchoolClassController.index);
routes.delete("/school_classes", adminsOnly, SchoolClassController.delete);
routes.patch("/school_classes", adminsOnly, SchoolClassController.restore);

export default routes;
