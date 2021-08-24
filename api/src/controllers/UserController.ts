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
      is_admin: yup.boolean(),
      admin_secret: yup.string().when("is_admin", {
        is: (is_admin) => is_admin === true,
        then: yup.string().required(),
      }),
      school_class_id: yup.string().when("is_admin", {
        is: (is_admin) => is_admin !== true,
        then: yup.string().required(),
      }),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: "Um ou mais campos não foram preenchidos corretamente",
      });
    }

    if (
      req.body.is_admin === true &&
      req.body.admin_secret !== process.env.ADMIN_SECRET
    ) {
      return res.status(401).json("Chave de cadastro de orientador incorreta");
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

    if (!req.body.is_admin) {
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
    } else {
      try {
        const response = await client.user.create({
          data: {
            name: req.body.name,
            email: req.body.email,
            password_hash,
            is_admin: true,
          },
          select: {
            id: true,
            name: true,
            email: true,
            is_admin: true,
            created_at: true,
          },
        });
        return res.json(response);
      } catch {
        return res.sendStatus(500);
      }
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
          is_admin: true,
          school_class: { select: { id: true, name: true } },
          created_at: true,
        },
      });

      if (user) {
        return res.json(user);
      } else
        return res
          .status(404)
          .json({ error: "Não existe nenhum usuário com o id buscado" });
    }

    let response = await client.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        is_admin: true,
        school_class: { select: { id: true, name: true } },
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
      old_password: yup
        .string()
        .min(6)
        .when("password", {
          is: (password) => password !== null,
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

  async adminUpdate(req: AuthenticatedRequest, res: Response) {
    const schema = yup.object().shape({
      id: yup.string().required(),
      name: yup.string(),
      email: yup.string().email(),
      password: yup.string().min(6),
      school_class_id: yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: "Um ou mais campos não foram preenchidos corretamente",
      });
    }

    const user = await client.user.findUnique({
      where: { id: req.body.id },
    });

    if (!user) {
      return res
        .status(404)
        .json({ error: "Não há nenhum usuário com este id" });
    }

    if (user.is_admin === true) {
      return res.status(403).json({
        error: "Não é permitido alterar dados de outros orientadores",
      });
    }

    let updates = {};

    if (req.body.name) {
      updates = { ...updates, name: req.body.name };
    }

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

    if (req.body.school_class_id) {
      const schoolClass = await client.schoolClass.findFirst({
        where: { id: req.body.school_class_id, deleted_at: null },
      });

      if (!schoolClass) {
        return res
          .status(404)
          .json({ error: "Não existe nenhuma turma com este id" });
      }

      updates = {
        ...updates,
        school_class_id: req.body.school_class_id,
      };
    }

    if (req.body.password) {
      let password_hash = await bcrypt.hash(req.body.password, 8);
      updates = { ...updates, password_hash };
    }

    const response = await client.user.update({
      where: { id: req.body.id },
      data: {
        ...updates,
      },
      select: {
        id: true,
        email: true,
        name: true,
        school_class: { select: { id: true, name: true } },
        created_at: true,
        updated_at: true,
      },
    });

    return res.json(response);
  }
}

export default new UserController();
