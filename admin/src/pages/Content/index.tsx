import React, { useEffect, useState } from "react";
import SchoolClassSelector from "../../components/SchoolClassSelector";

import useFetch from "../../hooks/useFetch";
import api from "../../services/api";
import { SimplifiedSchoolClassData } from "../SchoolClasses/interfaces";
import { ISchoolClassLesson } from "./interfaces";
import SchoolClassLesson from "./SchoolClassLesson";
import { Page, Container } from "./styles";

const Content: React.FC = () => {
  const [schoolClass, setSchoolClass] = useState<string>();
  const [schoolClassContent, setSchoolClassContent] = useState<
    ISchoolClassLesson[] | []
  >();

  const { data: schoolClassesList }: { data: SimplifiedSchoolClassData[] } =
    useFetch({
      path: "/school_classes_public",
      params: {},
    });

  useEffect(() => {
    if (schoolClass) {
      api
        .get(`/class_lessons?class=${schoolClass}`)
        .then((response) => setSchoolClassContent(response.data));
    }
  }, [schoolClass]);

  return (
    <Page className="app-safe-area">
      <Container>
        <SchoolClassSelector
          value={schoolClass}
          onChange={(newValue: string) => setSchoolClass(newValue)}
          data={schoolClassesList}
        />
        {schoolClass ? (
          <>
            {schoolClassContent && schoolClassContent.length > 0 ? (
              <ul>
                {schoolClassContent.map((lesson: ISchoolClassLesson) => (
                  <SchoolClassLesson data={lesson} key={lesson.id} />
                ))}
              </ul>
            ) : (
              <h3 className="warning">
                Esta turma ainda não possui nenhum conteúdo
              </h3>
            )}
          </>
        ) : (
          <h3 className="warning">
            Selecione a turma que você deseja ver/adicionar/editar o conteúdo
          </h3>
        )}
      </Container>
    </Page>
  );
};

export default Content;