import React from "react";
import "./styles.scss";
import "../Button.scss";
import Button from "components/Button";

export default function Confirm(props) {
  
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">Delete the appointment?</h1>
      <section className="appointment__actions">
        <Button onClick={props.onCancelDelete} danger>Cancel</Button>
        <Button onClick={props.onConfirmDelete} danger>Confirm</Button>
      </section>
    </main>
  );
}