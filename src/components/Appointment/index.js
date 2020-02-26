import React from "react";
import "./styles.scss";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import useVisualMode from '../../hooks/useVisualMode';
import Form from "./Form"
import Confirm from "./Confirm";
import Error from "./Error";
import Status from "./Status";



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const DELETING = "DELETING";



export default function Appointment(props) {
  // console.log('Appointment props', props);
  // console.log('props.interview.interviewer',props.interview.interviewer);
  
  // console.log('Appointment: ',props.interview);
  //props.interview: {student: "Yuko Smith", interviewer: {…}}
  
  //W07D3: Using our Custom Hook
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

    transition(SAVING);
        
    props.bookInterview(props.id, interview)
         .then(() => transition(SHOW))
         .catch(error => transition(ERROR_SAVE));
    transition(SHOW);
  }  

  //error
  // function save(name, interviewer) {
  //   const interview = {
  //     student: name,
  //     interviewer
  //   };
  
  //   transition(SAVING);
  
  //   props
  //     .bookInterview(props.id, interview)
  //     .then(() => transition(SHOW))
  //     .catch(error => transition(ERROR_SAVE, true));
  // }


  function deleteInterview (id) {
    // console.log("inside deleteInterview", name, interviewer)
    // props.cancelInterview(id)
    //     .catch(error => transition(ERROR_DELETE));
    transition(DELETING, true);
    props
     .cancelInterview(props.id)
     .then(() => transition(EMPTY))
     .catch(error => transition(ERROR_DELETE, true));
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
      

      {/* if props interview exist, show them */}
      {mode === SHOW && (
         props.interview ?
        <Show

        interviewer={props.interview.interviewer}
        student={props.interview.student}
        onDelete={() => {transition(CONFIRM)}}
        onEdit={() => transition(EDIT) }
        /> :  <Empty /> 
        )}
        
      {mode === CREATE && <Form onSave={save} interviewers={props.interviewers} onCancel={()=> back()}/> }
      
      {mode === SAVING && <Empty />}
      {mode === DELETING && <Status message={mode} />}

      {mode === CONFIRM && <Confirm onConfirmDelete={()=>{
                                                          // transition(DELETING,true)
                                                          deleteInterview(props.id)
                                                          }}
                                    onCancelDelete={()=> back()}
                                                          />}

      {mode === EDIT && <Form onSave={save} interviewer={props.interview.interviewer} name={props.interview.student} interviewers={props.interviewers} onCancel={()=> back()}/> }
      {/* ???????????? not working with back() */}
      {mode === ERROR_SAVE && <Error onClose={() => back()}/>}    
      {mode === ERROR_DELETE && <Error onClose={() => back()}/>}                                                  
    </article>
  )
}   