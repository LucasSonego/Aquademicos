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
    });

    if (!(await schema.isValid(req.body))) {
      return res.sendStatus(400).json({
        error: "Um ou mais campos não foram preenchidos corretamente",
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
      const { id, name, email } = await client.user.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          password_hash,
        },
      });
      return res.send({
        id,
        name,
        email,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.name,
      });
    }
  }

  async index(req: Request, res: Response) {
    if (req.query.id) {
      let user = await client.user.findFirst({
        where: { id: `${req.query.id}` },
        select: {
          id: true,
          name: true,
          email: true,
          created_at: true,
        },
      });

      if (user) {
        return res.json(user);
      } else
        return res
          .json({ error: "Não existe nenhum usuário com o id buscado" })
          .sendStatus(404);
    }

    let response = await client.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
      },
    });

    return res.json(response);
  }

  async update(req: AuthenticatedRequest, res: Response) {
    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      password: yup.string().min(6),
      oldPassword: yup
        .string()
        .min(6)
        .when("password", (password, field) => {
          return password ? field.required() : field;
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
      if (req.body.oldPassword) {
        if (!(await bcrypt.compare(req.body.oldPassword, user.password_hash))) {
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
