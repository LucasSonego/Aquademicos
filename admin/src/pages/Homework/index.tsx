import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import randomBase64 from "random-base64-string";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";

import ManageQuestion from "../../components/Question/Manage";
import { IQuestion } from "../../components/Question/interfaces";
import { Page, Container } from "./styles";
import { ImPlus } from "react-icons/im";
import FloatingDateSelector from "../../components/FloatingDateSelector";
import { formatDate } from "../../util/dateFormatter";
import api from "../../services/api";
import { AxiosResponse } from "axios";
import showNotification from "../../components/Notification";

interface IHomework {
  title: string;
  id?: string;
  questions?: IQuestion[];
  publicOn: Date;
  deadline?: Date;
}

const Homework: React.FC = () => {
  let { id, turma } = useParams<{ id: string; turma: string }>();
  const history = useHistory();

  const [publicOnDatepickerVisible, setPublicOnDatepickerVisible] =
    useState(false);
  const [deadlineDatepickerVisible, setDeadlineDatepickerVisible] =
    useState(false);

  const [homework, setHomework] = useState<IHomework>();

  useEffect(() => {
    async function getData() {
      return await api.get(`/homeworks/${id}`);
    }
    if (id === "criar") {
      setHomework({ title: "", publicOn: new Date(), questions: [] });
    } else {
      getData()
        .then((response: AxiosResponse) => {
          console.log(response.data);
          let sortedQuestions = [];
          if (response.data.questions) {
            sortedQuestions = [...response.data.questions];
            sortedQuestions = sortedQuestions.sort(
              (a, b) => a.position - b.position
            );
          }
          setHomework({
            ...response.data,
            publicOn: response.data.public_at,
            questions: sortedQuestions,
          });
        })
        .catch(() => history.push("/atividades"));
    }
  }, [history, id]);

  function handleUpdateQuestion(newQuestionValue: IQuestion, id: number) {
    let updatedHomework = { ...homework };
    updatedHomework.questions[id] = newQuestionValue;
    setHomework(updatedHomework);
  }

  function handleAddQuesiton() {
    let updatedQuestions: IQuestion[] = [...homework.questions];
    let id: string;
    while (!id) {
      let randomIdentifier = randomBase64(4);
      if (
        !(
          updatedQuestions.findIndex(
            (item) => item.id === `${randomIdentifier}`
          ) > 0
        )
      ) {
        id = `${randomIdentifier}`;
      }
    }

    updatedQuestions.push({
      id,
      description: "",
      points: 0,
      type: "single",
      answerOptions: [],
    });
    setHomework({ ...homework, questions: updatedQuestions });
  }

  function handleDeleteQuestion(id: string) {
    let updatedQuestions: IQuestion[] = [...homework.questions];
    updatedQuestions.splice(
      updatedQuestions.findIndex((item) => item.id === id),
      1
    );
    setHomework({ ...homework, questions: updatedQuestions });
  }

  function handleMoveQuestion(id: string, direction: "up" | "down") {
    let updatedQuestions: IQuestion[] = [...homework.questions];

    let questionIndex = updatedQuestions.findIndex((item) => item.id === id);
    let question = updatedQuestions.splice(questionIndex, 1)[0];

    direction === "up" ? questionIndex-- : questionIndex++;
    updatedQuestions.splice(questionIndex, 0, question);

    setHomework({ ...homework, questions: updatedQuestions });
  }

  function handleSave() {
    if (id === "criar") {
      api
        .post(`/homeworks/${turma}`, { ...homework })
        .then((response: AxiosResponse) => {
          console.log(response);
          if (response.status === 200) {
            showNotification({ type: "default", title: "Questionário salvo" });
            history.push(`/atividades/${turma}/${response.data.id}`);
          }
        })
        .catch((response: AxiosResponse) => console.log(response.data));
    } else {
      api
        .put(`/homeworks/${id}`, { ...homework })
        .then((response: AxiosResponse) => {
          console.log(response);
          if (response.status === 200) {
            showNotification({ type: "default", title: "Questionário salvo" });
            history.push(`/atividades/${turma}/${response.data.id}`);
          }
        })
        .catch((response: AxiosResponse) => console.log(response.data));
    }
  }

  return (
    <Page className="app-safe-area">
      <Container>
        {homework && (
          <>
            <input
              type="text"
              placeholder="Título do questionário"
              className="title"
              value={homework.title}
              onChange={(event) =>
                setHomework({ ...homework, title: event.target.value })
              }
            />

            {homework.questions &&
              homework.questions.map((question, index) => (
                <div className="question" key={question.id}>
                  <div className="controls">
                    <div className="up-down">
                      <button
                        disabled={index === 0}
                        onClick={() => handleMoveQuestion(question.id, "up")}
                      >
                        <AiOutlineArrowUp />
                      </button>
                      <button
                        disabled={index === homework.questions.length - 1}
                        onClick={() => handleMoveQuestion(question.id, "down")}
                      >
                        <AiOutlineArrowDown />
                      </button>
                    </div>

                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteQuestion(question.id)}
                    >
                      <BiTrash />
                    </button>
                  </div>
                  <ManageQuestion
                    value={question}
                    onChange={(newValue: IQuestion) =>
                      handleUpdateQuestion(newValue, index)
                    }
                  />
                </div>
              ))}

            <button
              className="add-question"
              onClick={() => handleAddQuesiton()}
            >
              <div className="left">
                <ImPlus />
              </div>
              Adicionar questão
            </button>

            <div className="dates">
              <div
                className="public-on"
                onClick={() => setPublicOnDatepickerVisible(true)}
              >
                <span className="label">Publicar em:</span>
                <span className="date">
                  {formatDate(new Date(homework.publicOn))}
                </span>
              </div>
              <div
                className="deadline"
                onClick={() => setDeadlineDatepickerVisible(true)}
              >
                <span className="label">Prazo:</span>
                <span className="date">
                  {homework.deadline
                    ? formatDate(new Date(homework.deadline))
                    : "Sem prazo"}
                </span>
              </div>
            </div>

            <FloatingDateSelector
              title="Publicar em:"
              visible={publicOnDatepickerVisible}
              setVisible={() => setPublicOnDatepickerVisible(false)}
              value={homework.publicOn ? homework.publicOn : null}
              onChange={(value) => {
                setHomework({ ...homework, publicOn: new Date(value) });
                setPublicOnDatepickerVisible(false);
              }}
            />

            <FloatingDateSelector
              title="Prazo:"
              visible={deadlineDatepickerVisible}
              setVisible={() => setDeadlineDatepickerVisible(false)}
              value={homework.deadline ? homework.deadline : null}
              onChange={(value) => {
                setHomework({ ...homework, deadline: new Date(value) });
                setDeadlineDatepickerVisible(false);
              }}
            >
              <div className="fd-bottom">
                <button
                  className={`no-deadline-btn ${
                    homework.deadline ? "" : "selected"
                  }`}
                  onClick={() => {
                    setHomework({ ...homework, deadline: null });
                    setDeadlineDatepickerVisible(false);
                  }}
                >
                  Sem prazo
                </button>
              </div>
            </FloatingDateSelector>

            <button onClick={() => handleSave()} className="save-questions">
              Salvar
            </button>
          </>
        )}
      </Container>
    </Page>
  );
};

export default Homework;
