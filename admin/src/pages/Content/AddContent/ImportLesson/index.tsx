import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { TiArrowBack } from "react-icons/ti";
import ReactPlayer from "react-player";
import DatePicker from "../../../../components/DatePicker";

import InputWithIcon from "../../../../components/InputWithIcon";
import showNotification from "../../../../components/Notification";
import useFetch from "../../../../hooks/useFetch";
import api from "../../../../services/api";
import { ILesson } from "../../interfaces";
import Lesson from "./Lesson";

import { Container } from "./styles";

interface Props {
  schoolClassId: string;
  schoolClassLessons: string[];
  onSuccess?: () => void;
}

const ImportLesson: React.FC<Props> = (props) => {
  const { data: lessons }: { data: ILesson[] } = useFetch({
    path: "/lessons",
    params: {},
  });
  const [search, setSearch] = useState("");
  const [filteredLessons, setFilteredLessons] = useState<[] | ILesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<ILesson | null>(null);
  const [publicAt, setPublicAt] = useState<string>(new Date().toISOString());

  function handleSearch(search: string) {
    setSearch(search);
    let filtered = lessons.filter(
      (lesson) =>
        lesson.title.toLowerCase().includes(search.toLowerCase()) ||
        lesson.description.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredLessons(filtered);
  }

  async function handleAddLesson() {
    await api
      .post("/class_lessons", {
        lessonId: selectedLesson.id,
        schoolClassId: props.schoolClassId,
        publicAt,
      })
      .then(() => {
        showNotification({
          type: "info",
          title: "Aula adicionada",
        });
        props.onSuccess();
      });
  }

  return (
    <Container>
      {lessons ? (
        <>
          {!selectedLesson ? (
            <>
              <InputWithIcon
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Buscar"
              >
                <GoSearch />
              </InputWithIcon>
              <ul className="lessons">
                {search
                  ? filteredLessons.map((lesson: ILesson) => {
                      if (
                        !props.schoolClassLessons.find(
                          (lessonId) => lesson.id === lessonId
                        )
                      ) {
                        return (
                          <Lesson
                            key={lesson.id}
                            data={lesson}
                            onSelect={(lesson: ILesson) =>
                              setSelectedLesson(lesson)
                            }
                          />
                        );
                      }
                      return null;
                    })
                  : lessons.map((lesson: ILesson) => {
                      if (
                        !props.schoolClassLessons.find(
                          (lessonId) => lesson.id === lessonId
                        )
                      ) {
                        return (
                          <Lesson
                            key={lesson.id}
                            data={lesson}
                            onSelect={(lesson: ILesson) =>
                              setSelectedLesson(lesson)
                            }
                          />
                        );
                      }
                      return null;
                    })}
              </ul>
            </>
          ) : (
            <>
              <div className="lesson-selected">
                <div className="left">
                  <h3 className="lesson-header">Aula selecionada:</h3>
                  <div className="lesson">
                    <h4>{selectedLesson.title}</h4>
                    <p>{selectedLesson.description}</p>
                    <ReactPlayer
                      url={selectedLesson.video_url}
                      className="video-player"
                      controls={true}
                      height={"150px"}
                      width={"fit-content"}
                    />
                    <button
                      className="back"
                      onClick={() => setSelectedLesson(null)}
                    >
                      <TiArrowBack /> Voltar para a busca de aulas
                    </button>
                  </div>
                </div>
                <div className="right">
                  <h3 className="extra-header">Disponibilizar aula:</h3>
                  <div className="date-picker-wrapper">
                    <span className="label">Disponivel em:</span>
                    <DatePicker
                      onChange={(value) =>
                        setPublicAt(new Date(value).toISOString())
                      }
                    />
                    <span className="grey-warning">
                      Aviso: A ordem de exibição das aulas é baseada nesta data.
                    </span>
                  </div>
                </div>
              </div>
              <button className="add-lesson" onClick={handleAddLesson}>
                Adicionar aula
              </button>
            </>
          )}
        </>
      ) : (
        <span className="no-lessons">
          Ainda não há nenhuma aula, você pode criar novas aulas na aba "Criação
          de aula"
        </span>
      )}
    </Container>
  );
};

export default ImportLesson;
