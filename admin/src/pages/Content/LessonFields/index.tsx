import React from "react";
import { MdSlowMotionVideo } from "react-icons/md";
import ReactPlayer from "react-player";
import TextareaAutosize from "react-textarea-autosize";
import DatePicker from "../../../components/DatePicker";
import InputWithIcon from "../../../components/InputWithIcon";
import Markdown from "../../../components/Markdown";

import { Container } from "./styles";

interface Props {
  title?: string;
  setTitle?: (value: string) => void;
  description?: string;
  setDescription?: (value: string) => void;
  content?: string;
  setContent?: (value: string) => void;
  videoUrl?: string;
  setVideoUrl?: (value: string) => void;
  publicAt?: string;
  setPublicAt?: (value: string) => void;
}

const LessonFields: React.FC<Props> = (props) => {
  return (
    <Container>
      {props.setTitle && (
        <>
          <span className="label title-label">Titulo</span>
          <input
            type="text"
            className="title-input"
            placeholder="Inserir titulo..."
            value={props.title}
            onChange={(event) => props.setTitle(event.target.value)}
          />
        </>
      )}
      {props.setDescription && (
        <>
          <span className="label description-label">Descrição</span>
          <TextareaAutosize
            minRows={2}
            className="description-input"
            value={props.description}
            onChange={(event) => props.setDescription(event.target.value)}
          />
        </>
      )}
      {props.setContent && (
        <>
          <div className="content-label margin-top">
            <span className="label">Conteúdo</span>
            <div className="grey-warning">
              <span>(opcional)</span>
            </div>
          </div>
          <div className="md-wrapper">
            <Markdown
              defaultValue={props.content || ""}
              onChange={(value: string) => props.setContent(value)}
            />
          </div>
        </>
      )}
      <div className="column margin-top">
        {props.setVideoUrl && (
          <div className="video-input">
            <span className="label">Video</span>
            <InputWithIcon
              value={props.videoUrl}
              onChange={(value) => props.setVideoUrl(value)}
              type="text"
              placeholder="Link do vídeo"
            >
              <MdSlowMotionVideo />
            </InputWithIcon>
            <div className="player-wrapper">
              <ReactPlayer
                url={props.videoUrl}
                className="video-player"
                controls={true}
                height={"200px"}
                width={"fit-content"}
              />
            </div>
          </div>
        )}
        {props.setPublicAt && (
          <>
            <div className="date-picker-wrapper">
              <span className="label public-at-label">Disponivel em:</span>
              <span className="grey-warning">
                Aviso: A ordem de exibição das aulas é baseada nesta data.
              </span>
              <DatePicker onChange={props.setPublicAt} />
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default LessonFields;
