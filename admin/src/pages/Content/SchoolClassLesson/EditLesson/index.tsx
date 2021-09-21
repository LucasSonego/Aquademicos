import React, { useState } from "react";
import FloatingDiv from "../../../../components/FloatingDiv";
import showNotification from "../../../../components/Notification";
import api from "../../../../services/api";
import { ISchoolClassLesson } from "../../interfaces";
import LessonFields from "../../LessonFields";

import { Container } from "./styles";

interface Props {
  data: ISchoolClassLesson;
  visible: boolean;
  setVisible: (value: boolean) => void;
  onSuccess: () => void;
}

const EditLesson: React.FC<Props> = (props) => {
  const lesson = props.data.lesson;
  const [title, setTitle] = useState(lesson.title);
  const [description, setDescription] = useState(lesson.description);
  const [content, setContent] = useState(lesson.text_content);
  const [videoUrl, setVideoUrl] = useState(lesson.video_url);

  async function updateLesson() {
    let data: any = {};
    if (title !== lesson.title) data = { ...data, title };
    if (description !== lesson.description) data = { ...data, description };
    if (content !== lesson.text_content)
      data = { ...data, textContent: content };
    if (videoUrl !== lesson.video_url) data = { ...data, videoUrl };

    await api.put(`/lessons/${lesson.id}`, { ...data }).then(() => {
      props.setVisible(false);
      showNotification({
        type: "info",
        message: "Aula atualizada",
      });
      props.onSuccess();
    });
  }

  return (
    <Container>
      {props.visible ? (
        <FloatingDiv
          visible={props.visible}
          setVisible={props.setVisible}
          title="Editar aula"
        >
          <LessonFields
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            content={content}
            setContent={setContent}
            videoUrl={videoUrl}
            setVideoUrl={setVideoUrl}
          />
          <button
            className="submit"
            disabled={
              !title ||
              !description ||
              !videoUrl ||
              (title === lesson.title &&
                description === lesson.description &&
                videoUrl === lesson.video_url)
            }
            onClick={() => updateLesson()}
          >
            Atualizar dados
          </button>
        </FloatingDiv>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default EditLesson;
