import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../../util/dateFormatter";

import { Container } from "./styles";

interface Props {
  data: {
    id: string;
    school_class_id: string;
    title: string;
    public_at: string;
    deadline: string;
  };
}

const HomeworkListItem: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      <Link
        to={`/atividades/${data.school_class_id}/${data.id}`}
        className="container-link"
      >
        {new Date() > new Date(data.public_at) &&
        (data.deadline ? new Date() <= new Date(data.deadline) : true) ? (
          <div className="dates-container blue-bg rounded-left">
            <div className="public">
              <h4>Disponível</h4>{" "}
              <span>({formatDate(new Date(data.public_at))})</span>
            </div>
            {data.deadline && (
              <>
                <div className="vr"></div>
                <div className="public">
                  <h4>Prazo</h4>{" "}
                  <span>{formatDate(new Date(data.deadline))}</span>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="dates-container light-gray-bg rounded-left">
            <div className="public-at">
              <h4>Disponível em</h4>{" "}
              <span>{formatDate(new Date(data.public_at))}</span>
            </div>
            {data.deadline && (
              <>
                <div className="vr"></div>
                <div className="public-at">
                  <h4>Prazo</h4>{" "}
                  <span>{formatDate(new Date(data.deadline))}</span>
                </div>
              </>
            )}
          </div>
        )}

        <div className="text">
          <h3>{data.title}</h3>
        </div>
        {/* <p>{data.description}</p> */}
      </Link>
    </Container>
  );
};

export default HomeworkListItem;
