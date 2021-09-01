import React from "react";
import useFetch from "../../hooks/useFetch";
import CreateClass from "./CreateClass";
import SchoolClass from "./SchoolClass";

import { Page, Container } from "./styles";

interface SchoolClassData {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  students?: [
    {
      id: string;
      name: string;
      email: string;
    }
  ];
}

type SchoolClassesData = SchoolClassData[];

const SchoolClasses: React.FC = () => {
  const { data, mutate }: { data: SchoolClassesData; mutate: any } = useFetch({
    path: "/school_classes",
    params: {},
  });
  return (
    <Page>
      <Container>
        <CreateClass
          onSuccess={(newSchoolClass) =>
            mutate([newSchoolClass, ...data], true)
          }
        />
        {data &&
          data?.map((schoolClass) => (
            <SchoolClass
              id={schoolClass.id}
              name={schoolClass.name}
              students={schoolClass.students}
              key={schoolClass.id}
            />
          ))}
      </Container>
    </Page>
  );
};

export default SchoolClasses;
