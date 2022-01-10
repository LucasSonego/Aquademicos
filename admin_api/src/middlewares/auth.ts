import "dotenv/config";

import jwt from "jsonwebtoken";
import { promisify } from "util";
import { Response, NextFunction } from "express";
import AuthenticatedRequest from "../Interfaces/AuthenticatedRequest";

export default async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.cookies.token) {
    return res.status(401).json({
      error: "Autenticação necessária",
    });
  }

  try {
    const decoded = await promisify(jwt.verify)(
      req.cookies.token,
      process.env.APP_SECRET
    );
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({
      error: "Token invalido",
    });
  }
};
