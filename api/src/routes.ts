import { Router } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authMiddleware from "./middlewares/auth";
import adminsOnly from "./middlewares/admin";
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
routes.put("/admin/users", adminsOnly, UserController.adminUpdate);

routes.post("/school_classes", adminsOnly, SchoolClassController.store);
routes.get("/school_classes", adminsOnly, SchoolClassController.index);
routes.put("/school_classes/:id", adminsOnly, SchoolClassController.update);
routes.delete("/school_classes/:id", adminsOnly, SchoolClassController.delete);
routes.patch("/school_classes/:id", adminsOnly, SchoolClassController.restore);

routes.post("/lessons", adminsOnly, LessonController.store);
routes.get("/lessons/:id", LessonController.index);
routes.get("/lessons", adminsOnly, LessonController.indexAll);
routes.put("/lessons/:id", adminsOnly, LessonController.update);
routes.delete("/lessons/:id", adminsOnly, LessonController.delete);

routes.post("/class_lessons", adminsOnly, ClassLessonController.store);
routes.get("/class_lessons", ClassLessonController.index);
routes.put("/class_lessons", adminsOnly, ClassLessonController.update);
routes.delete("/class_lessons", adminsOnly, ClassLessonController.delete);

export default routes;
