import React from "react";
import { string } from "prop-types";

const propTypes = {
  dateEnd: string,
  dateStart: string.isRequired,
  cardHeading: string.isRequired,
  address1: string.isRequired,
  address2: string.isRequired,
  city: string.isRequired,
  state: string.isRequired,
  zipCode: string.isRequired,
  information: string.isRequired,
};

const eventCard = (props) => {
  const {
    dateEnd,
    dateStart,
    cardHeading,
    address1,
    address2,
    city,
    state,
    zipCode,
    information,
  } = props;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const startDateObj = new Date(dateStart);
  const endDateObj = dateEnd ? new Date(dateEnd) : null;

  const startMonth = months[startDateObj.getMonth()];
  const startDay = startDateObj.getDate();
  const startYear = startDateObj.getFullYear();

  const endDay = endDateObj ? endDateObj.getDate() : "";

  return (
    <aside className="event-card">
      <h3 className="event-card__heading">{cardHeading}</h3>
      {dateEnd ? (
        <h4 className="event-card__date">
          <span>
            {startMonth} {startDay} - {endDay}, {startYear}{" "}
          </span>
          <span>11:30AM-4PM</span>
        </h4>
      ) : (
        <h4 className="event-card__date">
          <span>
            {startMonth} {startDay}, {startYear}{" "}
          </span>
          <span>11:30AM-4PM</span>
        </h4>
      )}
      <address className="event-card__location">
        <span>{address1}</span>
        <span>{address2}</span>
        <span>
          {city}, {state} {zipCode}
        </span>
      </address>
      <p className="event-card__information">{information}</p>
      <a href="#" className="btn btn--primary">
        Register Now
      </a>
    </aside>
  );
};

eventCard.propTypes = propTypes;
export default eventCard;
