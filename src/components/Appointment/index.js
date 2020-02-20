import React from "react";
import "./styles.scss";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
// import Confirm from "./Confirm";
// import Error from "./Error";
// import Form from "./Form";
// import Status from "./Status";



export default function Appointment(props) {
  // console.log('Appointment: ',props)
  return (
    <article className="appointment">
      <Header 
        time={props.time}
      />
      { props.interview ? <Show 
        interviewer={props.interview.inteviewer}
        student={props.interview.student}
      /> : <Empty /> }
    </article>
  )
}