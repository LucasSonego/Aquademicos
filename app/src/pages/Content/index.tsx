import React from "react";
import useFetch from "../../hooks/useFetch";

import { Page, Container } from "./styles";
import { Lesson as ILesson } from "./interfaces";
import Lesson from "./Lesson";
import { Link } from "react-router-dom";

const Content: React.FC = () => {
  const { data: lessons }: { data: ILesson[] } = useFetch({
    path: "/class_lessons",
    params: {},
  });

  const { data: userData }: { data: IUserData } = useFetch({
    path: "/sessions",
    params: {},
  });

  return (
    <Page className="app-safe-area">
      <Container>
        {userData && (
          <h2 className="school-class">{userData.school_class.name}</h2>
        )}
        {lessons?.length ? (
          lessons.map((lesson: ILesson) =>
            lesson.public_at ? (
              <Lesson
                key={lesson.id}
                id={lesson.id}
                title={lesson.title}
                description={lesson.description}
                public_at={lesson.public_at}
                isPublic={false}
              />
            ) : (
              <Link to={`/conteudo/${lesson.id}`}>
                <Lesson
                  key={lesson.id}
                  id={lesson.id}
                  title={lesson.title}
                  description={lesson.description}
                  isPublic={true}
                />
              </Link>
            )
          )
        ) : (
          <div className="no-content">
            <p>O professor ainda não publicou nenhuma aula.</p>
            <span>
              As aulas serão exibidas nesta página quando o professor
              publica-las
            </span>
          </div>
        )}
      </Container>
    </Page>
  );
};

export default Content;

interface IUserData {
  id: string;
  name: string;
  email: string;
  school_class: {
    id: string;
    name: string;
  };
}
