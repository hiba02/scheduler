import React, { useState } from "react";
import "./styles.scss";
import "../Button.scss";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList"
// import { interviewer } from "../../../stories/index.js";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  console.log("Form props.interviewer", props.interviewer)
  // interviewer is interviewer.id as number  ex) 1 

  function reset() {
    setName("");
    setInterviewer(null);
  }

  function validate() {
    
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("Interviewer cannot be blank");
      return;
    }
  
    setError("");

    props.onSave(name, interviewer);
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            type="text"
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter Student Name"
            onSubmit={event => event.preventDefault()}
            name="name"
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
}