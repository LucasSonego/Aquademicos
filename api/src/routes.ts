import { Router } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authMiddleware from "./middlewares/auth";
import UserController from "./controllers/UserController";
import SessionController from "./controllers/SessionController";
import SchoolClassController from "./controllers/SchoolClassController";
import LessonController from "./controllers/LessonController";
import ClassLessonController from "./controllers/ClassLessonController";

const routes = Router();

routes.use(cookieParser());
routes.use(
  cors({
    credentials: true,
    origin: [
      "http://192.168.0.100:3000",
      "http://192.168.0.100:3001",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
  })
);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);
routes.get("/school_classes_public", SchoolClassController.publicIndex);

routes.use(authMiddleware);

routes.get("/sessions", SessionController.index);
routes.delete("/sessions", SessionController.delete);

routes.get("/users", UserController.index);
routes.put("/users", UserController.update);

routes.get("/lessons/:id", LessonController.index);

routes.get("/class_lessons", ClassLessonController.index);

export default routes;
