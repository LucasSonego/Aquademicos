import { Request, Response } from "express";
import { client } from "../database/client";
import AuthenticatedRequest from "../Interfaces/AuthenticatedRequest";

class LessonController {
  async index(req: AuthenticatedRequest, res: Response) {
    const user = await client.user.findFirst({ where: { id: req.userId } });

    const lesson = await client.lesson.findFirst({
      where: {
        id: req.params.id,
        used_on: { some: { school_class: { id: user.school_class_id } } },
      },
      include: { used_on: { select: { public_at: true } } },
    });

    if (
      !lesson ||
      new Date(lesson.used_on[0].public_at).toISOString() >
        new Date().toISOString()
    ) {
      return res.status(404).json({
        error: "Não ha nenhuma aula disponivel com este id",
      });
    }

    return res.json({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      text_content: lesson.text_content,
      video_url: lesson.video_url,
    });
  }
}

export default new LessonController();
