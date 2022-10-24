import React, { useEffect, useState } from "react";

import SchoolClassSelector from "../../components/SchoolClassSelector";
import api from "../../services/api";
import HomeworkListItem from "./HomeworkListItem";

import { Page, Container } from "./styles";

interface IHomework {
  id: string;
  title: string;
  school_class_id: string;
  public_at: string;
  deadline: string;
}

const Homeworks: React.FC = () => {
  const [schoolClass, setSchoolClass] = useState<string>("");
  const [homeworks, setHomeworks] = useState<IHomework[]>([]);

  useEffect(() => {
    if (schoolClass) {
      api
        .get<IHomework[]>(`/homeworks/list/${schoolClass}`)
        .then((response) => setHomeworks(response.data));
    }
  }, [schoolClass]);

  return (
    <Page className="app-safe-area">
      <Container>
        <SchoolClassSelector
          value={schoolClass}
          onChange={(newValue: string) => setSchoolClass(newValue)}
        />

        {schoolClass &&
          homeworks &&
          homeworks.length > 0 &&
          homeworks.map((homework) => (
            <HomeworkListItem key={homework.id} data={homework} />
          ))}
      </Container>
    </Page>
  );
};

export default Homeworks;
