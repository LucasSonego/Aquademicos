import { NextFunction, Response } from "express";
import AuthenticatedRequest from "../Interfaces/AuthenticatedRequest";
import { client } from "../database/client";

export default async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { is_admin } = await client.user.findUnique({
    where: { id: req.userId },
    select: {
      is_admin: true,
    },
  });

  if (!is_admin) {
    return res
      .status(403)
      .json({ error: "Apenas os orientadores podem realizar esta ação" });
  }

  return next();
};
