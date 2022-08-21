import { Request, Response } from "express";
import { client } from "../database/client";
import * as yup from "yup";

class HomeworkController {
  async store(req: Request, res: Response) {
    // Corrigir validação de schema!!!

    const schemaObj = yup.object().shape({
      id: yup.string(),
      title: yup.string().required(),
      questions: yup
        .array()
        .of(
          yup.object().shape({
            description: yup.string().required(),
            type: yup.string().required(),
            answerOptions: yup
              .array()
              .of(
                yup.object().shape({
                  text: yup.string().required(),
                  selected: yup.boolean().required(),
                })
              )
              .required(),
          })
        )
        .required(),
      publicOn: yup.date(),
      deadline: yup.date(),
    });

    if (!(await schemaObj.isValid(req.body))) {
      return res.status(400).json({
        error: "Um ou mais campos não foram preenchidos corretamente",
      });
    }

    await client.homework
      .create({
        data: {
          title: req.body.title,
          public_at: req.body.publicOn,
          school_class_id: req.params.schoolClassId,
        },
      })
      .then((homework) => {
        req.body.questions.map((quest) => {
          client.question
            .create({
              data: {
                homework_id: homework.id,
                description: quest.description,
                type: quest.type,
                points: quest.points,
              },
            })
            .then((question) => {
              quest.answerOptions.map((ans) =>
                client.answerOption.create({
                  data: {
                    question_id: question.id,
                    text: ans.text,
                    selected: ans.selected,
                  },
                })
              );
            })
            .catch((err) => {
              return res.status(500).json(err);
            });
        });
        return res.json(homework);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }

  async index(req: Request, res: Response) {
    let homework = await client.homework.findFirst({
      where: { id: req.params.id },
      include: {
        questions: {
          include: { answers: true },
        },
      },
    });

    if (homework) {
      return res.send(
        JSON.stringify(
          homework,
          (key, value) => (typeof value === "bigint" ? Number(value) : value) //converte bigint em numero compativel com JS
        )
      );
    } else {
      return res.status(404).send({ error: "teste" });
    }
    // let homework = {
    //   title: "Questionário 1",
    //   id: "T1Q1",
    //   publicOn: new Date(),
    //   questions: [
    //     {
    //       type: "single",
    //       id: "T1Q1q1",
    //       points: 50,
    //       description: "Questão 1",
    //       answerOptions: [
    //         {
    //           id: "01",
    //           text: "Resposta 1",
    //           selected: false,
    //         },
    //         {
    //           id: "02",
    //           text: "Resposta 2",
    //           selected: true,
    //         },
    //         {
    //           id: "03",
    //           text: "Resposta 3",
    //           selected: false,
    //         },
    //         {
    //           id: "04",
    //           text: "Resposta 4",
    //           selected: false,
    //         },
    //       ],
    //     },
    //     {
    //       id: "T1Q1q2",
    //       points: 50,
    //       type: "multi",
    //       description: "Questão 2",
    //       answerOptions: [
    //         {
    //           id: "01",
    //           text: "Resposta 1",
    //           selected: false,
    //         },
    //         {
    //           id: "02",
    //           text: "Resposta 2",
    //           selected: false,
    //         },
    //         {
    //           id: "03",
    //           text: "Resposta 3",
    //           selected: true,
    //         },
    //         {
    //           id: "04",
    //           text: "Resposta 4",
    //           selected: true,
    //         },
    //       ],
    //     },
    //   ],
    // };

    return res.json(homework);
  }
}

/*
  id: string;
  points: number;
  description: string;
  type: "single" | "multi";
  answerOptions?: IAnswerOption[]
*/

export default new HomeworkController();
