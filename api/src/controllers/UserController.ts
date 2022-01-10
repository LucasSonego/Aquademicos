import "dotenv/config";
import * as yup from "yup";
import { client } from "../database/client";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import AuthenticatedRequest from "../Interfaces/AuthenticatedRequest";

class UserController {
  async store(req: Request, res: Response) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().required().email(),
      password: yup.string().required().min(6),
      school_class_id: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      console.log(req.body);
      return res.status(400).json({
        error: "Um ou mais campos não foram preenchidos corretamenteee",
      });
    }

    const emailAlreadyUsed = await client.user.findFirst({
      where: { email: req.body.email },
    });

    if (emailAlreadyUsed) {
      return res.status(409).json({
        error: "Este email já está cadastrado para outro usuário",
      });
    }

    let password_hash = await bcrypt.hash(req.body.password, 8);

    try {
      const schoolClass = await client.schoolClass.findFirst({
        where: { id: req.body.school_class_id, deleted_at: null },
      });

      if (!schoolClass) {
        return res
          .status(404)
          .json({ error: "Não existe nenhuma turma com este id" });
      }

      const response = await client.user.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          password_hash,
          school_class_id: req.body.school_class_id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          school_class: { select: { id: true, name: true } },
          created_at: true,
        },
      });
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }

  async index(req: AuthenticatedRequest, res: Response) {
    let userData = await client.user.findFirst({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        name: true,
        school_class: {
          select: {
            id: true,
            name: true,
          },
        },
        created_at: true,
      },
    });

    if (!userData) return res.sendStatus(500);

    return res.json(userData);
  }

  async update(req: AuthenticatedRequest, res: Response) {
    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      password: yup.string().min(6),
      old_password: yup.string().when("password", {
        is: (password) => !!password,
        then: yup.string().min(6).required(),
      }),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: "Um ou mais campos não foram preenchidos corretamente",
      });
    }

    const user = await client.user.findUnique({ where: { id: req.userId } });

    let updates = {};

    if (req.body.email && req.body.email !== user.email) {
      const emailAlreadyUsed = await client.user.findUnique({
        where: { email: req.body.email },
      });
      if (emailAlreadyUsed) {
        return res.status(409).json({
          error: "Este email já esta cadastrado para outro usuário",
        });
      }
      updates = { ...updates, email: req.body.email };
    }

    if (req.body.password) {
      if (req.body.old_password) {
        if (
          !(await bcrypt.compare(req.body.old_password, user.password_hash))
        ) {
          return res.status(401).json({
            error: "Senha antiga incorreta",
          });
        }
        let password_hash = await bcrypt.hash(req.body.password, 8);
        updates = { ...updates, password_hash };
      }
    }

    if (req.body.name) {
      updates = { ...updates, name: req.body.name };
    }

    const response = await client.user.update({
      where: { id: req.userId },
      data: { ...updates },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!response) {
      return res.sendStatus(500);
    }

    return res.json(response);
  }
}

export default new UserController();
