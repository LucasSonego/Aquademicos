import * as yup from "yup";
import { client } from "../database/client";
import { Request, Response } from "express";
import AuthenticatedRequest from "../Interfaces/AuthenticatedRequest";

class SchoolClassController {
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
}

export default new SchoolClassController();
