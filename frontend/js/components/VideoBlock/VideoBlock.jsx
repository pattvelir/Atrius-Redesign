import React from "react";
import { string } from "prop-types";

const propTypes = { title: string, videoURL: string, description: string };

const VideoBlock = (props) => {
  const { title, videoURL, description } = props;

  return (
    <section className="video-block">
      {title && <h3 className="video-block__title">{title}</h3>}
      <figure className="video-block__media">
        <div className="video-block__media-wrapper">
          {videoURL ? (
            <iframe
              title="video block"
              src={videoURL}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          ) : (
            <img
              src="/assets/Demo-build/img/placeholders/video_block_placeholder_image.svg"
              alt="Video Block Placeholder"
              className="video-block__media-placeholder"
            />
          )}
        </div>
        {description && (
          <figcaption className="video-block__caption">
            {description}
          </figcaption>
        )}
      </figure>
    </section>
  );
};
VideoBlock.propTypes = propTypes;
export default VideoBlock;
