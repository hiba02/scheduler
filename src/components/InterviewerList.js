import React from "react";

// import "components/DayListItem.scss";
import "./InterviewList.scss";
import InterviewerListItem from "./InterviewerListItem";



export default function InterviewerList(props) {
  const _InterviewerList = props.interviewers.map(interviewer => {
    return (
    <InterviewerListItem  
    id={interviewer.id}
    name={interviewer.name} 
    avatar={interviewer.avatar}
    selected='setInterviewer'
    />
    );
  });

  return (<section className="interviewers">
<h4 className="interviewers__header text--light">{_InterviewerList}</h4>
  <ul className="interviewers__list"></ul>
  </section>);
}