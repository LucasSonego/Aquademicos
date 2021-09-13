import { Request, Response } from "express";
import AuthenticatedRequest from "../Interfaces/AuthenticatedRequest";
import { client } from "../database/client";
import * as yup from "yup";

class ClassLessonController {
  async store(req: Request, res: Response) {
    const schema = yup.object().shape({
      lessonId: yup.string().required(),
      schoolClassId: yup.string().required(),
      publicAt: yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: "Um ou mais campos não foram preenchidos corretamente",
      });
    }

    const [lesson, schoolClass] = await Promise.all([
      client.lesson.findFirst({ where: { id: req.body.lessonId } }),
      client.schoolClass.findFirst({ where: { id: req.body.schoolClassId } }),
    ]);

    if (!lesson) {
      return res.status(404).json({
        error: "Não há nenhuma aula com este id",
      });
    }

    if (!schoolClass) {
      return res.status(404).json({
        error: "Não há nenhuma turma com este id",
      });
    }

    const classLesson = await client.schoolClassLesson.findFirst({
      where: {
        school_class_id: req.body.schoolClassId,
        lesson_id: req.body.lessonId,
      },
    });

    if (classLesson) {
      return res.status(409).json({ error: "Esta aula já existe nesta turma" });
    }

    let publicAt: string;
    if (req.body.publicAt) {
      publicAt = new Date(req.body.publicAt).toISOString();
    } else {
      publicAt = new Date().toISOString();
    }

    let response = await client.schoolClassLesson.create({
      data: {
        lesson_id: req.body.lessonId,
        school_class_id: req.body.schoolClassId,
        public_at: publicAt,
      },
    });

    return res.json(response);
  }

  async index(req: AuthenticatedRequest, res: Response) {
    const user = await client.user.findFirst({ where: { id: req.userId } });
    if (!user?.is_admin) {
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
    } else {
      if (!req.query.class) {
        let classLessons = await client.schoolClass.findMany({
          where: { deleted_at: null },
          select: {
            id: true,
            name: true,
            lessons: {
              select: { public_at: true, lesson: true },
            },
          },
        });

        let response = classLessons.map((schoolClass) => {
          let lessons = schoolClass.lessons.map((item) => item.lesson);
          return { id: schoolClass.id, name: schoolClass.name, lessons };
        });

        return res.json(response);
      } else {
        const [schoolClass, classLessons] = await Promise.all([
          client.schoolClass.findFirst({ where: { id: `${req.query.class}` } }),
          client.schoolClassLesson.findMany({
            where: { school_class_id: `${req.query.class}` },
            select: {
              id: true,
              lesson: true,
              school_class_id: true,
              public_at: true,
            },
            orderBy: { public_at: "asc" },
          }),
        ]);

        if (!schoolClass) {
          return res
            .status(404)
            .json({ error: "Não há nenhuma turma com este id" });
        }

        return res.json(classLessons);
      }
    }
  }

  async update(req: Request, res: Response) {
    const schema = yup.object().shape({
      schoolClassId: yup.string().required(),
      lessonId: yup.string().required(),
      publicAt: yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: "Um ou mais campos não foram preenchidos corretamente",
      });
    }

    const classLesson = await client.schoolClassLesson.findFirst({
      where: {
        lesson_id: req.body.lessonId,
        school_class_id: req.body.schoolClassId,
      },
    });

    if (!classLesson) {
      return res
        .status(404)
        .json({ error: "Não há nenhuma aula que corresponde com esses dados" });
    }

    let publicAt = new Date(req.body.publicAt).toISOString();

    let response = await client.schoolClassLesson.update({
      where: {
        id: classLesson.id,
      },
      data: {
        public_at: publicAt,
      },
    });

    return res.json(response);
  }

  async delete(req: Request, res: Response) {
    const schema = yup.object().shape({
      lessonId: yup.string().required(),
      schoolClassId: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: "Um ou mais campos não foram preenchidos corretamente",
      });
    }

    let classLesson = await client.schoolClassLesson.findFirst({
      where: {
        lesson_id: req.body.lessonId,
        school_class_id: req.body.schoolClassId,
      },
    });

    if (!classLesson) {
      return res
        .status(404)
        .json({ error: "Não há nenhuma aula que corresponde com esses dados" });
    }

    await client.schoolClassLesson.delete({ where: { id: classLesson.id } });

    return res.sendStatus(200);
  }
}

export default new ClassLessonController();
