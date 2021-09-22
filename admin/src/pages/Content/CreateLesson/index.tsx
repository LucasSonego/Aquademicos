import { AxiosResponse } from "axios";
import React, { useState } from "react";

import FloatingDiv from "../../../components/FloatingDiv";
import Loading from "../../../components/Loading";
import showNotification from "../../../components/Notification";
import api from "../../../services/api";
import LessonFields from "../LessonFields";
import { Container } from "./styles";

interface Props {
  schoolClassId: string;
  onSuccess?: () => void;
}

const CreateLesson: React.FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [publicAt, setPublicAt] = useState("");
  const [editorKey, setEditorKey] = useState(1);

  async function handleCreateLesson() {
    if (!title) {
      setWarning('Preencha o campo "Titulo"');
      return;
    }
    if (!description) {
      setWarning('Preencha o campo "Descrição"');
      return;
    }
    if (!videoUrl) {
      setWarning('Preencha o campo "Video"');
      return;
    }
    if (
      !(
        (videoUrl.includes("http://") || videoUrl.includes("https://")) &&
        videoUrl.includes(".")
      )
    ) {
      setWarning('Preencha o campo "Video" com um url válido');
      return;
    }

    setWarning("");
    setIsLoading(true);

    let data: any = {
      title,
      description,
      videoUrl,
    };
    if (content) {
      data = { ...data, textContent: content };
    }

    await api
      .post("/lessons", data)
      .then(async (response: CreateLessonRes) => {
        let data: any = {
          lessonId: response.data.id,
          schoolClassId: props.schoolClassId,
        };
        if (publicAt) {
          data = { ...data, publicAt };
        }
        await api
          .post("/class_lessons", data)
          .then(() => {
            showNotification({
              type: "info",
              title: "Aula criada",
            });

            setShowModal(false);
            setTitle("");
            setDescription("");
            setVideoUrl("");
            setContent("");
            setEditorKey(editorKey + 1);
            setPublicAt("");
            setIsLoading(false);

            if (props.onSuccess) {
              props.onSuccess();
            }
          })
          .catch(() => setIsLoading(false));
      })
      .catch(() => setIsLoading(false));
  }

  return (
    <Container>
      <button className="button" onClick={() => setShowModal(true)}>
        <svg
          className="inline-svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 0C8.42435 0 8.83131 0.168571 9.13137 0.468629C9.43143 0.768688 9.6 1.17565 9.6 1.6V6.4H14.4C14.8243 6.4 15.2313 6.56857 15.5314 6.86863C15.8314 7.16869 16 7.57565 16 8C16 8.42435 15.8314 8.83131 15.5314 9.13137C15.2313 9.43143 14.8243 9.6 14.4 9.6H9.6V14.4C9.6 14.8243 9.43143 15.2313 9.13137 15.5314C8.83131 15.8314 8.42435 16 8 16C7.57565 16 7.16869 15.8314 6.86863 15.5314C6.56857 15.2313 6.4 14.8243 6.4 14.4V9.6H1.6C1.17565 9.6 0.768688 9.43143 0.468629 9.13137C0.168571 8.83131 0 8.42435 0 8C0 7.57565 0.168571 7.16869 0.468629 6.86863C0.768688 6.56857 1.17565 6.4 1.6 6.4H6.4V1.6C6.4 1.17565 6.56857 0.768688 6.86863 0.468629C7.16869 0.168571 7.57565 0 8 0V0Z"
          />
        </svg>
        <span className="btn-span">Adicionar Conteúdo</span>
      </button>

      <FloatingDiv
        title="Criar Aula"
        visible={showModal}
        setVisible={setShowModal}
      >
        <div className="floating-div-content">
          <LessonFields
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            content={content}
            setContent={setContent}
            videoUrl={videoUrl}
            setVideoUrl={setVideoUrl}
            publicAt={publicAt}
            setPublicAt={setPublicAt}
            key={editorKey}
          />
          <p className="warning">{warning}</p>
          <button
            className="create-lesson-btn"
            disabled={isLoading}
            onClick={handleCreateLesson}
          >
            {!isLoading ? (
              "Criar Aula"
            ) : (
              <>
                Criando aula <Loading />
              </>
            )}
          </button>
        </div>
      </FloatingDiv>
    </Container>
  );
};

export default CreateLesson;

interface CreateLessonRes extends AxiosResponse {
  data: {
    id: string;
    title: string;
    description: string;
    text_content: string | null;
    video_url: string;
  };
}
