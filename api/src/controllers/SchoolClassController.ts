import * as yup from "yup";
import { client } from "../database/client";
import { Request, Response } from "express";
import AuthenticatedRequest from "../Interfaces/AuthenticatedRequest";

class SchoolClassController {
  async store(req: AuthenticatedRequest, res: Response) {
    const schema = yup.object().shape({
      name: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: "Um ou mais campos não foram preenchidos corretamente",
      });
    }

    const schoolClass = await client.schoolClass.create({
      data: {
        name: `${req.body.name}`,
      },
      select: {
        id: true,
        name: true,
        created_at: true,
      },
    });

    if (schoolClass) {
      return res.json(schoolClass);
    } else {
      return res.sendStatus(500);
    }
  }

  async index(req: Request, res: Response) {
    const schema = yup.object().shape({
      get_deleted: yup.boolean(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({
        error: "Um ou mais campos não foram preenchidos corretamente",
      });
    }

    if (!req.query.get_deleted) {
      const schoolClasses = await client.schoolClass.findMany({
        where: {
          deleted_at: null,
        },
        select: {
          id: true,
          name: true,
          created_at: true,
          updated_at: true,
          students: { select: { id: true, name: true, email: true } },
        },
        orderBy: { created_at: "desc" },
      });
      return res.json(schoolClasses);
    } else {
      const schoolClasses = await client.schoolClass.findMany({
        where: {
          NOT: [{ deleted_at: null }],
        },
        select: {
          id: true,
          name: true,
          created_at: true,
          deleted_at: true,
          deleted_by: { select: { id: true, name: true, email: true } },
        },
        orderBy: { deleted_at: "desc" },
      });
      return res.json(schoolClasses);
    }
  }

  async publicIndex(_req: Request, res: Response) {
    const response = await client.schoolClass.findMany({
      where: { deleted_at: null },
      select: {
        id: true,
        name: true,
      },
      orderBy: { created_at: "desc" },
    });

    if (response) {
      return res.json(response);
    }

    return res.sendStatus(500);
  }

  async delete(req: AuthenticatedRequest, res: Response) {
    const schema = yup.object().shape({
      id: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: "Um ou mais campos não foram preenchidos corretamente",
      });
    }

    const validSchoolClass = await client.schoolClass.findUnique({
      where: { id: req.body.id },
    });

    if (!validSchoolClass) {
      return res
        .status(404)
        .json({ error: "Não há nenhuma turma com este id" });
    }

    const deletedSchoolClass = await client.schoolClass.update({
      where: { id: req.body.id },
      data: {
        deleted_at: new Date(),
        deleted_by_id: req.userId,
      },
    });

    return res.json(deletedSchoolClass);
  }

  async restore(req: AuthenticatedRequest, res: Response) {
    const schema = yup.object().shape({
      id: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: "Um ou mais campos não foram preenchidos corretamente",
      });
    }

    const validSchoolClass = await client.schoolClass.findUnique({
      where: { id: req.body.id },
    });

    if (!validSchoolClass) {
      return res
        .status(404)
        .json({ error: "Não há nenhuma turma com este id" });
    }

    const deletedSchoolClass = await client.schoolClass.update({
      where: { id: req.body.id },
      data: {
        deleted_at: null,
        deleted_by_id: null,
      },
    });

    return res.json(deletedSchoolClass);
  }
}

export default new SchoolClassController();
