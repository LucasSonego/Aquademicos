import React, { useState } from "react";
import { BsArrowsCollapse } from "react-icons/bs";
import ReactPlayer from "react-player";
import Markdown from "../../../../../components/Markdown";

import { ILesson } from "../../../interfaces";
import { Container } from "./styles";

interface Props {
  data: ILesson;
  onSelect: (lesson: ILesson) => void;
}

const Lesson: React.FC<Props> = (props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Container>
      {expanded && (
        <div className="buttons">
          <button className="select" onClick={() => props.onSelect(props.data)}>
            Selecionar esta aula
          </button>
          <button className="collapse" onClick={() => setExpanded(false)}>
            <BsArrowsCollapse />
          </button>
        </div>
      )}

      <div
        className={`always-visible ${!expanded && "pointer"}`}
        onClick={() => !expanded && setExpanded(true)}
      >
        <h4>{props.data.title}</h4>
        <p>{props.data.description}</p>
      </div>

      {expanded && (
        <div className="details">
          {props.data.text_content && (
            <div className="content-wrapper">
              <Markdown
                defaultValue={props.data.text_content}
                readOnly={true}
              />
            </div>
          )}
          <div className="video-player-wrapper">
            <ReactPlayer
              url={props.data.video_url}
              className="video-player"
              controls={true}
              height={"200px"}
              width={"fit-content"}
            />
          </div>
        </div>
      )}
    </Container>
  );
};

export default Lesson;
