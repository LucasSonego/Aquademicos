import React, { useState } from "react";
import { CgPlayListAdd, CgPlayListSearch } from "react-icons/cg";

import FloatingDiv from "../../../components/FloatingDiv";
import CreateLesson from "./CreateLesson";
import ImportLesson from "./ImportLesson";

import { Container } from "./styles";

interface Props {
  schoolClassId: string;
  schoolClassLessons: string[];
  onSuccess: () => void;
}

const AddContent: React.FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState<"create" | "import">("create");

  return (
    <Container>
      <button className="button" onClick={() => setShowModal(true)}>
        <svg
          className="inline-svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 0C8.42435 0 8.83131 0.168571 9.13137 0.468629C9.43143 0.768688 9.6 1.17565 9.6 1.6V6.4H14.4C14.8243 6.4 15.2313 6.56857 15.5314 6.86863C15.8314 7.16869 16 7.57565 16 8C16 8.42435 15.8314 8.83131 15.5314 9.13137C15.2313 9.43143 14.8243 9.6 14.4 9.6H9.6V14.4C9.6 14.8243 9.43143 15.2313 9.13137 15.5314C8.83131 15.8314 8.42435 16 8 16C7.57565 16 7.16869 15.8314 6.86863 15.5314C6.56857 15.2313 6.4 14.8243 6.4 14.4V9.6H1.6C1.17565 9.6 0.768688 9.43143 0.468629 9.13137C0.168571 8.83131 0 8.42435 0 8C0 7.57565 0.168571 7.16869 0.468629 6.86863C0.768688 6.56857 1.17565 6.4 1.6 6.4H6.4V1.6C6.4 1.17565 6.56857 0.768688 6.86863 0.468629C7.16869 0.168571 7.57565 0 8 0V0Z"
          />
        </svg>
        <span className="btn-span">Adicionar Conteúdo</span>
      </button>

      <FloatingDiv
        title="Adicionar conteúdo"
        visible={showModal}
        setVisible={setShowModal}
      >
        <div className="floating-div-content">
          <div className="tab-selector">
            <div
              className={`tab ${tab === "create" && "selected"}`}
              onClick={() => setTab("create")}
            >
              <CgPlayListAdd /> Criação de aula
            </div>
            <div
              className={`tab ${tab === "import" && "selected"}`}
              onClick={() => setTab("import")}
            >
              <CgPlayListSearch /> Buscar aulas
            </div>
          </div>
          {tab === "create" ? (
            <CreateLesson
              schoolClassId={props.schoolClassId}
              onSuccess={() => {
                setShowModal(false);
                props.onSuccess();
              }}
            />
          ) : (
            <ImportLesson
              schoolClassId={props.schoolClassId}
              schoolClassLessons={props.schoolClassLessons}
              onSuccess={() => {
                setShowModal(false);
                setTab("create");
                props.onSuccess();
              }}
            />
          )}
        </div>
      </FloatingDiv>
    </Container>
  );
};

export default AddContent;
