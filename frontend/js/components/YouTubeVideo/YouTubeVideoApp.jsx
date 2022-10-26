import React, { useState, useEffect, useMemo } from "react";
import { string, bool, shape } from "prop-types";
import { loadScript, createPlayer } from "./youtubeService.js";

import uniqueid from "lodash.uniqueid";
import cx from "classnames";

const propTypes = {
  id: string.isRequired,
  title: string,
  poster: shape({
    alt: string,
    srcset: string,
    sizes: string,
  }),
  transcriptLink: shape({
    text: string,
    title: string,
    href: string,
  }),
  caption: string,
  darkButton: bool,
};

const YouTubeVideo = (props) => {
  const { id, title, poster, transcriptLink, caption, darkButton } = props;

  const [videoStarted, setVideoStarted] = useState(false);
  const [player, setPlayer] = useState(null);
  const [playerReady, setPlayerReady] = useState(false);

  const playerId = useMemo(() => uniqueid(), []);

  useEffect(() => {
    // On mount, check to see if the API script is already loaded
    loadScript();

    // Check if window.onYouTubeIframeAPIReady already exists
    if (window.YT) {
      const newPlayer = createPlayer(playerId, id, onPlayerReady);
      setPlayer(newPlayer);
    } else {
      // after onYouTubeIframeAPIReady is executed, create a new player
      const callback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (callback) {
          callback();
        }

        const newPlayer = createPlayer(playerId, id, onPlayerReady);
        setPlayer(newPlayer);
      };
    }
  }, [id, playerId]);

  useEffect(() => {
    // If video's started but player is not ready, play video when ready
    if (videoStarted && playerReady) {
      player.playVideo();
    }
  }, [player, playerReady, videoStarted]);

  const onPlayerReady = () => {
    setPlayerReady(true);
  };

  const playVideo = () => {
    setVideoStarted(true);

    if (playerReady) {
      player.playVideo();
    }
  };

  return (
    <div
      className={cx("youtube-video", {
        "youtube-video--video-started": videoStarted,
      })}
    >
      {title && <h2 className="youtube-video__title">{title}</h2>}
      <figure className="youtube-video__media">
        <div className="youtube-video__video-wrapper">
          <button
            className={cx("youtube-video__poster-button", {
              "youtube-video__poster-button--dark": darkButton,
            })}
            onClick={playVideo}
            type="button"
          >
            {poster && poster.srcset ? (
              <img
                className="youtube-video__poster-image"
                alt={poster.alt}
                srcSet={poster.srcset}
                sizes={poster.sizes || "(min-width: 1440px) 1440px, 100vw"}
              />
            ) : (
              <img
                className="youtube-video__poster-image"
                alt=""
                src={`https://i3.ytimg.com/vi/${id}/maxresdefault.jpg`}
              />
            )}
          </button>
          <div id={playerId} />
        </div>
        <div className="youtube-video__caption">
          {caption && (
            <figcaption className="youtube-video__figure-caption">
              {caption && (
                <span className="youtube-video__description">{caption}</span>
              )}
            </figcaption>
          )}
          {transcriptLink && (
            <div className="youtube-video__transcript">
              <a
                className="link"
                aria-label={transcriptLink.title}
                href={transcriptLink.href}
                download={transcriptLink.type === "download"}
              >
                {transcriptLink.text}
              </a>
            </div>
          )}
        </div>
      </figure>
    </div>
  );
};

YouTubeVideo.propTypes = propTypes;

export default YouTubeVideo;
