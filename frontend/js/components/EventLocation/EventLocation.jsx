import React from "react";
import { string } from "prop-types";

const propTypes = {
  title: string,
  width: string,
  height: string,
  mode: string,
  mapApiKey: string,
  loc: string,
};
const EventLocation = (props) => {
  const { title, width, height, mode, mapApiKey, loc } = props;
  return (
    <div className="event-location">
      <div className="event-location__map">
        <iframe
          title={title}
          width={width}
          height={height}
          frameBorder="0"
          style={{ border: 0 }}
          src={`https://www.google.com/maps/embed/v1/${mode}?key=${mapApiKey}&q=${loc}`}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
EventLocation.propTypes = propTypes;
export default EventLocation;
