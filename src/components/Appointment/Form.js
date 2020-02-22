import React, { useState } from "react";
import "./styles.scss";
import "../Button.scss";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList"
// import { interviewer } from "../../../stories/index.js";

export default function Form(props) {
  // console.log('inside Form', props);
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  // console.log('inside From componet name, interviewer:', name, interviewer);
  // console.log('props.onSave', props.onSave); 
  function reset() {
    setName("");
    setInterviewer(null);
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name={name}
            type="text"
            onChange={(event) => setName(event.target.value)}
            placeholder="Student Name"
            onSubmit={event => event.preventDefault()}


            // onSave={()=>{props.onSave(name, interviewer)}}


            /*
              This must be a controlled component
            */
          />
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>Cancel</Button>
          <Button confirm onClick={(event) => props.onSave(name, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
}