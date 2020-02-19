import React, { useState } from "react";
import "./styles.scss";
import "../Button.scss";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList"
// import { interviewer } from "../../../stories/index.js";

export default function Form(props) {
  // console.log(props);
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);


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
            /*
              This must be a controlled component
            */
          />
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={props.setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={reset}>Cancel</Button>
          <Button confirm onClick={(event) => setName(props.interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
}