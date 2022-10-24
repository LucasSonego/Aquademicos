import { Request, Response } from "express";
import { client } from "../database/client";
import * as yup from "yup";

class HomeworkController {
  async store(req: Request, res: Response) {
    const homeworkSchema = yup.object().shape({
      id: yup.string().strict(),
      title: yup.string().strict().required(),
      questions: yup.array().min(1).strict().required(),
      publicOn: yup.string().strict(),
      deadline: yup.string().strict(),
    });

    if (!(await homeworkSchema.isValid(req.body))) {
      return res.status(400).json({
        error: "Um ou mais campos não foram preenchidos corretamente",
      });
    }

    const questionSchema = yup.object().shape({
      description: yup.string().strict().required(),
      type: yup
        .string()
        .strict()
        .matches(/single|multi/)
        .required(),
      answerOptions: yup.array().min(1).strict().required(),
      points: yup.number().strict(),
    });

    const answerOptionSchema = yup.object().shape({
      text: yup.string().strict().required(),
      selected: yup.boolean().strict().required(),
    });

    let questionValidation = [];
    let answerValidation = [];

    await Promise.all(
      req.body.questions.map(async (question) => {
        let isValid = await questionSchema.isValid(question);
        questionValidation.push(isValid);

        if (isValid) {
          await Promise.all(
            question.answerOptions.map(async (answer) => {
              let isValid = await answerOptionSchema.isValid(answer);
              answerValidation.push(isValid);
            })
          );
        }
      })
    );

    if (
      questionValidation.findIndex((validation) => validation == false) >= 0 ||
      answerValidation.findIndex((validation) => validation == false) >= 0
    ) {
      return res.status(400).json({
        error: "Um ou mais campos não foram preenchidos corretamente",
      });
    }

    await client.homework
      .create({
        data: {
          title: req.body.title,
          public_at: req.body.publicOn,
          deadline: req.body.deadline,
          school_class_id: req.params.schoolClassId,
        },
      })
      .then((homework) => {
        req.body.questions.map((quest, index) => {
          client.question
            .create({
              data: {
                homework_id: homework.id,
                description: quest.description,
                type: quest.type,
                points: quest.points,
                position: index,
              },
            })
            .then((question) => {
              quest.answerOptions.map((ans) => {
                client.answerOption
                  .create({
                    data: {
                      question_id: question.id,
                      text: ans.text,
                      selected: ans.selected,
                    },
                  })
                  .then(() => {}); //por algum motivo, não funciona sem isso!
              });
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
      let _homework: any = { ...homework };
      _homework.questions = [];

      homework.questions.map((question) => {
        let _question: any = { ...question };
        delete _question.answers;

        _question.answerOptions = question.answers;
        _homework.questions.push(_question);
      });

      return res.send(
        JSON.stringify(
          _homework,
          (key, value) => (typeof value === "bigint" ? Number(value) : value) //converte bigint em numero compatível com JS
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

  async indexAll(req: Request, res: Response) {
    let homeworks = await client.homework.findMany({
      where: { school_class_id: req.params.school_class_id },
      orderBy: [{ public_at: "asc" }],
    });

    return res.json(homeworks);
  }

  async update(req: Request, res: Response) {
    let homework = await client.homework.findFirst({
      where: { id: req.params.id },
      include: {
        questions: {
          include: { answers: true },
        },
      },
    });

    if (!homework) {
      return res.status(404).json({
        error: "Atividade não encontrada",
      });
    }

    const homeworkSchema = yup.object().shape({
      id: yup.string().strict(),
      title: yup.string().strict().required(),
      questions: yup.array().min(1).strict().required(),
      publicOn: yup.string().strict(),
      deadline: yup.string().strict(),
    });

    if (!(await homeworkSchema.isValid(req.body))) {
      return res.status(400).json({
        error: "Um ou mais campos não foram preenchidos corretamente",
      });
    }

    const questionSchema = yup.object().shape({
      description: yup.string().strict().required(),
      type: yup
        .string()
        .strict()
        .matches(/single|multi/)
        .required(),
      answerOptions: yup.array().min(1).strict().required(),
      points: yup.number().strict(),
    });

    const answerOptionSchema = yup.object().shape({
      text: yup.string().strict().required(),
      selected: yup.boolean().strict().required(),
    });

    let questionValidation = [];
    let answerValidation = [];

    await Promise.all(
      req.body.questions.map(async (question) => {
        let isValid = await questionSchema.isValid(question);
        questionValidation.push(isValid);

        if (isValid) {
          await Promise.all(
            question.answerOptions.map(async (answer) => {
              let isValid = await answerOptionSchema.isValid(answer);
              answerValidation.push(isValid);
            })
          );
        }
      })
    );

    if (
      questionValidation.findIndex((validation) => validation == false) >= 0 ||
      answerValidation.findIndex((validation) => validation == false) >= 0
    ) {
      return res.status(400).json({
        error: "Um ou mais campos não foram preenchidos corretamente",
      });
    }

    await client.homework
      .update({
        where: { id: req.params.id },
        data: {
          title: req.body.title,
          public_at: req.body.public_at,
          deadline: req.body.deadline,
        },
      })
      .then(async () => {
        //deleta questões antigas
        await Promise.all(
          homework.questions.map(async (question) => {
            await client.answerOption.deleteMany({
              where: { question_id: question.id },
            });
            await client.question.delete({ where: { id: question.id } });
          })
        );

        //insere questões atualizadas
        req.body.questions.map((quest, index) => {
          client.question
            .create({
              data: {
                homework_id: homework.id,
                description: quest.description,
                type: quest.type,
                points: quest.points,
                position: index,
              },
            })
            .then((question) => {
              quest.answerOptions.map((ans) => {
                client.answerOption
                  .create({
                    data: {
                      question_id: question.id,
                      text: ans.text,
                      selected: ans.selected,
                    },
                  })
                  .then(() => {}); //por algum motivo, não funciona sem isso!
              });
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
}

/*
  id: string;
  points: number;
  description: string;
  type: "single" | "multi";
  answerOptions?: IAnswerOption[]
*/

export default new HomeworkController();
