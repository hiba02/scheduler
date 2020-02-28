import React from "react";
import "./DayListItem.scss";
import classnames from "classnames";

export default function DayListItem(props) {

  const dayClass = classnames("day-list__item",
    {"day-list__item--selected": props.selected},
    {"day-list__item--full": props.spots === 0}
    );
  const formatSpots = function (originalFormat) {
    if (originalFormat === 0) {
      return "no spots remaining";
    } else if (originalFormat === 1) {
      return "1 spot remaining";
    } else if (originalFormat >= 2) {
      return `${originalFormat} spots remaining`
    }
    
  }
  const newPropSpots = formatSpots(props.spots);

  const setDay = function(day) {
    return day;
  }
  // TOFIX: onClick={() => setDay(props.setDay)
  return (
    // <li onClick={() => setDay(props.setDay)}>
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 >{props.name}</h2>
      <h3>{newPropSpots}</h3>
      {/* <h3 className={dayClass}>{props.spots}</h3> */}
    </li>
  );
}
