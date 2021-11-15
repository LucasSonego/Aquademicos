import { Request, Response } from "express";
import { client } from "../database/client";
import * as yup from "yup";
import AuthenticatedRequest from "../Interfaces/AuthenticatedRequest";

class LessonController {
  async store(req: Request, res: Response) {
    const schema = yup.object().shape({
      title: yup.string().required(),
      description: yup.string().required(),
      textContent: yup.string(),
      videoUrl: yup.string().url().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: "Um ou mais campos não foram preenchidos corretamente",
      });
    }

    let response = await client.lesson.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        text_content: req.body.textContent || null,
        video_url: req.body.videoUrl,
      },
    });

    return res.json(response);
  }

  async index(req: AuthenticatedRequest, res: Response) {
    const user = await client.user.findFirst({ where: { id: req.userId } });
    if (!user.is_admin) {
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
    } else {
      const lesson = await client.lesson.findFirst({
        where: { id: req.params.id },
      });

      if (!lesson) {
        return res
          .status(404)
          .json({ error: "Não há nenhuma aula com este id" });
      }

      return res.json(lesson);
    }
  }

  async indexAll(req: Request, res: Response) {
    const lessons = await client.lesson.findMany({
      orderBy: { title: "asc" },
      select: {
        id: true,
        title: true,
        description: true,
        text_content: true,
        video_url: true,
      },
    });

    return res.json(lessons);
  }

  async update(req: Request, res: Response) {
    const schema = yup.object().shape({
      title: yup.string(),
      description: yup.string(),
      textContent: yup.string().nullable(),
      videoUrl: yup.string().url(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: "Um ou mais campos não foram preenchidos corretamente",
      });
    }

    const lesson = await client.lesson.findFirst({
      where: { id: req.params.id },
    });
    if (!lesson) {
      return res.status(404).json({ error: "Não há nenhuma aula com este id" });
    }

    let data = {};

    if (req.body.title) {
      data = { ...data, title: req.body.title };
    }
    if (req.body.description) {
      data = { ...data, description: req.body.description };
    }
    if (req.body.textContent !== undefined) {
      data = { ...data, text_content: req.body.textContent };
    }
    if (req.body.videoUrl) {
      data = { ...data, video_url: req.body.videoUrl };
    }

    if (data === {}) {
      return res.status(400).json({ error: "Não há nada a ser alterado" });
    }

    let response = await client.lesson.update({
      where: { id: req.params.id },
      data,
    });

    return res.json(response);
  }

  async delete(req: Request, res: Response) {
    const lesson = await client.lesson.findFirst({
      where: { id: req.params.id },
    });

    if (!lesson) {
      return res.status(404).json({ error: "Não há nenhuma aula com este id" });
    }

    await client.schoolClassLesson.deleteMany({
      where: { lesson_id: req.params.id },
    });
    await client.lesson.delete({ where: { id: req.params.id } });

    return res.sendStatus(200);
  }
}

export default new LessonController();
