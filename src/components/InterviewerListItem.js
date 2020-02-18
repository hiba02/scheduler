import React from "react";
import "./InterviewerListItem.scss";
import classnames from 'classnames';

export default function InterviewerListItem(props){
  const interviewsClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });
  return (
    <li className={interviewsClass}>
      <img
        className={interviewsClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  );
}