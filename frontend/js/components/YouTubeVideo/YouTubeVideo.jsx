import React from "react";
import {} from "prop-types";

const propTypes = {};

const YouTubeVideoMount = (props) => {
  return (
    <div
      className="js-youtube-video-mount youtube-video-mount component"
      data-model={JSON.stringify({ ...props })}
    ></div>
  );
};

YouTubeVideoMount.propTypes = propTypes;
export default YouTubeVideoMount;
