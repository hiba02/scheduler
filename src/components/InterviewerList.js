import React from "react";

// import "components/DayListItem.scss";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";


//Taken from Listing Interviewers II
export default function InterviewerList(props) {
  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}  //InterviewerList props to value (currently interviewer) 
        onChange={event => props.setInterviewer(interviewer.id)} //onChange (currently setInterviewer).
      />
    );
  });

  return (<section className="interviewers">
  <h4 className="interviewers__header text--light">{interviewers}</h4>
  <ul className="interviewers__list"></ul>
  </section>);
}