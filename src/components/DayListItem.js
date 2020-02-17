import React from "react";

// import "components/DayListItem.scss";
import "./DayListItem.scss";
import classnames from 'classnames';


// Don't forget to import DayListItem.scss into the DayListItem component before moving on.
// Import the classnames library to the DayListItem component.
// Create an object called dayClass that applies the day-list__item--selected class name if props.selected is true and the day-list__item--full class name if props.spots is 0.
export default function DayListItem(props) {
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className={dayClass}>{props.name}</h2>
      <h3 className={dayClass}>{props.spots}</h3>
    </li>
  );
}
