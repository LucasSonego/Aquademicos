import { Response } from "express";
import AuthenticatedRequest from "../Interfaces/AuthenticatedRequest";
import { client } from "../database/client";

class ClassLessonController {
  async index(req: AuthenticatedRequest, res: Response) {
    const user = await client.user.findFirst({ where: { id: req.userId } });

    const userSchoolClassLessons = await client.schoolClassLesson.findMany({
      where: { school_class_id: user.school_class_id },
      select: {
        public_at: true,
        lesson: {
          select: { id: true, title: true, description: true },
        },
      },
      orderBy: { public_at: "asc" },
    });

    let response = userSchoolClassLessons.map((item) => {
      if (item.public_at < new Date()) {
        return item.lesson;
      }
      return {
        id: item.lesson.id,
        title: item.lesson.title,
        public_at: item.public_at,
      };
    });

    return res.json(response);
  }
}

export default new ClassLessonController();
