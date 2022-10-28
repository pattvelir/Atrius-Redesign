import React from "react";
import { bool, string, object } from "prop-types";

import Icon from "../Icon/Icon.jsx";

const propTypes = {
  height: bool,
  position: string,
  video: string,
  mediaStyles: object,
};

const BackgroundVideo = (props) => {
  const { height, position, video, mediaStyles } = props;
  return (
    <div className="background-video js-background-video is-playing">
      <video
        className="background-video__video js-background-video-el"
        data-object-fit={height ? "cover" : null}
        data-object-position={position}
        src={video}
        autoPlay
        muted
        loop
        style={mediaStyles}
        poster="https://via.placeholder.com/1920x1080/4a4f46/606368"
      />
      <button
        type="button"
        className="background-video__button js-background-video-button"
      >
        <Icon
          iconName="play"
          className="background-video__play"
          title="play video"
        />
        <Icon
          iconName="pause"
          className="background-video__pause"
          title="pause video"
        />
      </button>
    </div>
  );
};

BackgroundVideo.propTypes = propTypes;
export default BackgroundVideo;
