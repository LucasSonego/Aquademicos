import "dotenv/config";
import { client } from "../database/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as yup from "yup";
import AuthenticatedRequest from "../Interfaces/AuthenticatedRequest";
import TimeMagnitude from "../util/TimeMagnitude";

class SessionController {
  async store(req: Request, res: Response) {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: "Um ou mais campos não foram preenchidos corretamente",
      });
    }
    const { email, password } = req.body;
    const user = await client.user.findFirst({ where: { email } });

    if (!user) {
      return res.status(401).json({
        error: "Usuário ou senha inválidos",
      });
    }

    let passwordsCheck = await bcrypt.compare(password, user.password_hash);
    if (!user || !passwordsCheck) {
      return res.status(401).json({
        error: "Usuário ou senha inválidos",
      });
    }

    const { id, name } = user;
    const token = jwt.sign({ id }, process.env.APP_SECRET, {
      expiresIn: process.env.TOKEN_VALIDITY,
    });

    return res
      .cookie("token", token, {
        expires: new Date(
          new Date().getTime() +
            TimeMagnitude.toMilliseconds(process.env.TOKEN_VALIDITY)
        ),
        httpOnly: true,
      })
      .cookie("authenticated", true, {
        expires: new Date(
          new Date().getTime() +
            TimeMagnitude.toMilliseconds(process.env.TOKEN_VALIDITY)
        ),
      })
      .json({
        id,
        name,
        email,
      });
  }

  async index(req: AuthenticatedRequest, res: Response) {
    const { id, name, email } = await client.user.findFirst({
      where: { id: req.userId },
    });

    if (!id) {
      return res.sendStatus(500);
    }

    const token = jwt.sign({ id }, process.env.APP_SECRET, {
      expiresIn: process.env.TOKEN_VALIDITY,
    });

    let tokenValidity = new Date(
      new Date().getTime() +
        TimeMagnitude.toMilliseconds(process.env.TOKEN_VALIDITY)
    );

    return res
      .cookie("token", token, {
        expires: tokenValidity,
        httpOnly: true,
      })
      .cookie("authenticated", true, {
        expires: tokenValidity,
      })
      .json({
        id,
        name,
        email,
      });
  }

  async delete(_req: AuthenticatedRequest, res: Response) {
    return res
      .clearCookie("token")
      .clearCookie("authenticated")
      .sendStatus(200);
  }
}

export default new SessionController();
