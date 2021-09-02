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

  function onUpdateSchoolClass(newData: SchoolClassData) {
    let updatedData: SchoolClassData[] = [...data];
    let updatedClassIndex = updatedData.findIndex(
      (item) => item.id === newData.id
    );
    updatedData.splice(updatedClassIndex, 1, newData);
    mutate([...updatedData], true);
  }

  function onDeleteSchoolClass(id: string) {
    let updatedData: SchoolClassData[] = [...data];
    let deletedClassIndex = updatedData.findIndex((item) => item.id === id);
    updatedData.splice(deletedClassIndex, 1);
    mutate([...updatedData], true);
  }

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
              onUpdate={(newData) => onUpdateSchoolClass(newData)}
              onDelete={(deletedId) => onDeleteSchoolClass(deletedId)}
            />
          ))}
      </Container>
    </Page>
  );
};

export default SchoolClasses;
