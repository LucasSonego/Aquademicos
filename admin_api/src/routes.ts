import { Router } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authMiddleware from "./middlewares/auth";
import UserController from "./controllers/UserController";
import SessionController from "./controllers/SessionController";
import SchoolClassController from "./controllers/SchoolClassController";
import LessonController from "./controllers/LessonController";
import ClassLessonController from "./controllers/ClassLessonController";
import HomeworkController from "./controllers/HomeworkController";

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
routes.put("/students", UserController.adminUpdate);

routes.post("/school_classes", SchoolClassController.store);
routes.get("/school_classes", SchoolClassController.index);
routes.put("/school_classes/:id", SchoolClassController.update);
routes.delete("/school_classes/:id", SchoolClassController.delete);
routes.patch("/school_classes/:id", SchoolClassController.restore);

routes.post("/lessons", LessonController.store);
routes.get("/lessons/:id", LessonController.index);
routes.get("/lessons", LessonController.indexAll);
routes.put("/lessons/:id", LessonController.update);
routes.delete("/lessons/:id", LessonController.delete);

routes.post("/class_lessons", ClassLessonController.store);
routes.get("/class_lessons", ClassLessonController.index);
routes.put("/class_lessons", ClassLessonController.update);
routes.delete("/class_lessons", ClassLessonController.delete);

routes.post("/homeworks/:schoolClassId", HomeworkController.store);
routes.get("/homeworks/list/:school_class_id", HomeworkController.indexAll);
routes.get("/homeworks/:id", HomeworkController.index);
routes.put("/homeworks/:id", HomeworkController.update);

export default routes;
