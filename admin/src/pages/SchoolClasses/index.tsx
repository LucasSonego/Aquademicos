import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";

import useFetch from "../../hooks/useFetch";
import api from "../../services/api";
import CreateClass from "./CreateClass";
import SchoolClass from "./SchoolClass";
import DeletedClass from "./DeletedClass";
import showNotification from "../../components/Notification";
import { DeletedSchoolClass, SchoolClassData } from "./interfaces";

import { Page, Container } from "./styles";

const SchoolClasses: React.FC = () => {
  const [deletedListExpanded, setDeletedListExpanded] = useState(false);

  const {
    data: schoolClassList,
    mutate: mutateSchoolClassList,
  }: { data: SchoolClassData[]; mutate: any } = useFetch({
    path: "/school_classes",
    params: {},
  });

  const {
    data: deletedSchoolClasses,
    mutate: mutateDeletedSchoolClasses,
  }: { data: DeletedSchoolClass[]; mutate: any } = useFetch({
    path: "/school_classes?get_deleted=true",
    params: {},
  });

  function onUpdateSchoolClass(newData: SchoolClassData) {
    let updatedData: SchoolClassData[] = [...schoolClassList];
    let updatedClassIndex = updatedData.findIndex(
      (item) => item.id === newData.id
    );
    updatedData.splice(updatedClassIndex, 1, newData);
    mutateSchoolClassList([...updatedData], true);
  }

  function onDeleteSchoolClass(id: string) {
    let updatedData: SchoolClassData[] = [...schoolClassList];
    let deletedClassIndex = updatedData.findIndex((item) => item.id === id);
    let deletedClass = updatedData.splice(deletedClassIndex, 1)[0];
    mutateSchoolClassList([...updatedData], true);
    mutateDeletedSchoolClasses([deletedClass, ...deletedSchoolClasses], true);
  }

  async function onRestoreSchoolClass(id: string) {
    await api.patch(`/school_classes/${id}`).then(() => {
      showNotification({
        type: "info",
        title: "Turma restaurada",
      });

      let updatedDeletedList = [...deletedSchoolClasses];
      let restoredId = updatedDeletedList.findIndex((item) => item.id === id);
      updatedDeletedList.splice(restoredId, 1);
      mutateDeletedSchoolClasses([...updatedDeletedList], true);
      mutateSchoolClassList([...schoolClassList], true);
    });
  }

  return (
    <Page className="app-safe-area">
      <Container>
        <CreateClass
          onSuccess={(newSchoolClass) =>
            mutateSchoolClassList([newSchoolClass, ...schoolClassList], true)
          }
        />
        {schoolClassList &&
          schoolClassList?.map((schoolClass) => (
            <SchoolClass
              key={schoolClass.id}
              id={schoolClass.id}
              name={schoolClass.name}
              students={schoolClass.students}
              schoolClassList={schoolClassList.map(
                (schoolClass: SchoolClassData) => {
                  return { id: schoolClass.id, name: schoolClass.name };
                }
              )}
              onUpdate={(newData) => onUpdateSchoolClass(newData)}
              onDelete={(deletedId) => onDeleteSchoolClass(deletedId)}
            />
          ))}
        {deletedSchoolClasses?.length > 0 && (
          <div className="deleted">
            <button
              className="show-deleted"
              onClick={() =>
                deletedListExpanded
                  ? setDeletedListExpanded(false)
                  : setDeletedListExpanded(true)
              }
            >
              <BsTrash />
              {`${
                deletedListExpanded ? "Esconder" : "Exibir"
              } turmas deletadas`}
            </button>

            {deletedListExpanded && (
              <ul className="deleted-school-classes">
                {deletedSchoolClasses.map((schoolClass) => (
                  <DeletedClass
                    key={schoolClass.id}
                    data={schoolClass}
                    onRestore={(id: string) => onRestoreSchoolClass(id)}
                  />
                ))}
              </ul>
            )}
          </div>
        )}
      </Container>
    </Page>
  );
};

export default SchoolClasses;
