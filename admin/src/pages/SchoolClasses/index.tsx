import React from "react";

import useFetch from "../../hooks/useFetch";
import CreateClass from "./CreateClass";
import SchoolClass from "./SchoolClass";
import { SchoolClassData } from "./interfaces";

import { Page, Container } from "./styles";

const SchoolClasses: React.FC = () => {
  const { data, mutate }: { data: SchoolClassData[]; mutate: any } = useFetch({
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
              key={schoolClass.id}
              id={schoolClass.id}
              name={schoolClass.name}
              students={schoolClass.students}
              schoolClassList={data.map((schoolClass: SchoolClassData) => {
                return { id: schoolClass.id, name: schoolClass.name };
              })}
              onUpdate={(newData) => onUpdateSchoolClass(newData)}
              onDelete={(deletedId) => onDeleteSchoolClass(deletedId)}
            />
          ))}
      </Container>
    </Page>
  );
};

export default SchoolClasses;
