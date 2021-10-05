import React, { useState } from "react";

import FloatingDiv from "../../../../components/FloatingDiv";
import showNotification from "../../../../components/Notification";
import api from "../../../../services/api";
import { ISchoolClassLesson } from "../../interfaces";
import LessonFields from "../../LessonFields";
import DeletionOptions from "./DeletionOptions";
import { Container, FlexibleDiv } from "./styles";

interface Props {
  data: ISchoolClassLesson;
  visible: boolean;
  setVisible: (value: boolean) => void;
  onSuccess: () => void;
}

const LessonDetails: React.FC<Props> = (props) => {
  const lesson = props.data.lesson;
  const [title, setTitle] = useState(lesson.title);
  const [description, setDescription] = useState(lesson.description);
  const [content, setContent] = useState(lesson.text_content);
  const [videoUrl, setVideoUrl] = useState(lesson.video_url);

  const [showDeletionOptions, setShowDeletionOptions] = useState(false);

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

  function onDelete() {
    props.setVisible(false);
    props.onSuccess();
  }

  return (
    <Container>
      {props.visible ? (
        <FloatingDiv
          visible={props.visible}
          setVisible={props.setVisible}
          title="Detalhes da aula"
        >
          <div className="floating-div-content">
            <FlexibleDiv expanded={showDeletionOptions}>
              <h3>Conteúdo:</h3>
              <DeletionOptions
                lessonId={props.data.lesson.id}
                schoolClassId={props.data.school_class_id}
                expanded={showDeletionOptions}
                setExpanded={setShowDeletionOptions}
                onDelete={onDelete}
              />
            </FlexibleDiv>
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
                  videoUrl === lesson.video_url &&
                  content === lesson.text_content)
              }
              onClick={() => updateLesson()}
            >
              Atualizar dados
            </button>
          </div>
        </FloatingDiv>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default LessonDetails;
