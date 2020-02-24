import React from "react";
import "./styles.scss";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import useVisualMode from '../../hooks/useVisualMode';
import Form from "./Form"
// import Confirm from "./Confirm";
// import Error from "./Error";
// import Status from "./Status";



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE="CREATE";



export default function Appointment(props) {
  // console.log('Appointment: ',props)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // console.log('mode', mode);
  // console.log('props', props);
  // console.log('props.bookInterview, props.interviewer.id', props.bookInterview);  

  
  
  //W07D3: Creating Appointments
  function save(name, interviewer) {
    console.log("inside save", name, interviewer)
    
    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
    transition(SHOW);
  }  

  return (
    <article className="appointment">
      <Header 
        time={props.time}
      />
      {/* { props.interview ? 
      <Show 
        interviewer={props.interview.inteviewer}
        student={props.interview.student}/> : <Empty /> } */}

      {/*TOFIX original one: {mode === EMPTY && <Empty onAdd={props.onAdd} />}   */}
     
      {/* {mode === EMPTY && <Empty onAdd={props.onAdd}/>} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      
      {mode === SHOW && (
        <Show
        interviewer={props.interview.interviewer}
        student={props.interview.student}
        />
        )}
      {mode === CREATE && <Form onSave={save} interviewers={props.interviewers} onCancel={()=> back()}/> }
    </article>
  )
}   