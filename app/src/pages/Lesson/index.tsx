import React, { useState } from "react";
import ReactPlayer from "react-player";
import { VscDebugRestart } from "react-icons/vsc";
import { useParams } from "react-router-dom";

import Markdown from "../../components/Markdown";
import useFetch from "../../hooks/useFetch";

import { Page, Container } from "./styles";

const Lesson: React.FC = () => {
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoPlayerKey, setVideoPlayerKey] = useState(1);
  const { id } = useParams<Params>();

  const { data }: { data: LessonData } = useFetch({
    path: `/lessons/${id}`,
    params: {},
  });

  return (
    <Page className="app-safe-area">
      <Container>
        {data && (
          <>
            <div className="headers">
              <h3>{data.title}</h3>
              <p>{data.description}</p>
            </div>
            <div className="content">
              {data.text_content && (
                <div className="md-wrapper">
                  <Markdown defaultValue={data.text_content} readOnly={true} />
                </div>
              )}
              <div className="player-area">
                <div className="player-wrapper">
                  {!videoEnded ? (
                    <ReactPlayer
                      url={data.video_url}
                      className="video-player"
                      controls={true}
                      height={window.innerWidth > 850 ? "35vw" : "55vw"}
                      width="100%"
                      onEnded={() => {
                        setVideoEnded(true);
                        setVideoPlayerKey(videoPlayerKey + 1);
                      }}
                      config={{
                        youtube: {
                          playerVars: {
                            color: "white",
                          },
                        },
                        vimeo: {
                          playerOptions: { color: "006BFF" },
                        },
                      }}
                      key={videoPlayerKey}
                    />
                  ) : (
                    <div className="video-ended">
                      <p>Aula concluída</p>
                      <button onClick={() => setVideoEnded(false)}>
                        <VscDebugRestart /> Rever
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </Container>
    </Page>
  );
};

export default Lesson;

interface Params {
  id: string;
}

interface LessonData {
  id: string;
  title: string;
  description: string;
  text_content: string;
  video_url: string;
}
