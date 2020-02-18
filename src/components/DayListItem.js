import React from "react";
import "./DayListItem.scss";
import classnames from 'classnames';

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
    } else if (originalFormat === 2) {
      return "2 spots remaining"
    }
    
  }
  const newPropSpots = formatSpots(props.spots);

  const setDay = function(day) {
    return day;
  }

  return (
    <li onClick={() => setDay(props.setDay)}>
      <h2 className={dayClass}>{props.name}</h2>
      <h3 className={dayClass}>{newPropSpots}</h3>
      {/* <h3 className={dayClass}>{props.spots}</h3> */}
    </li>
  );
}
