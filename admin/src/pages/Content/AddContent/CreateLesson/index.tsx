import { AxiosResponse } from "axios";
import React, { useState } from "react";

import Loading from "../../../../components/Loading";
import showNotification from "../../../../components/Notification";
import api from "../../../../services/api";
import LessonFields from "../../LessonFields";
import { Container } from "./styles";

interface Props {
  schoolClassId: string;
  onSuccess?: () => void;
}

const CreateLesson: React.FC<Props> = (props) => {
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
