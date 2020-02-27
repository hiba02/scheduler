import React, { useState, useEffect, useReducer } from "react";
import "./Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import Axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";



// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   }
// ];

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

export default function Application(props) {


  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();




  const appointments = getAppointmentsForDay(state, state.day);
  // console.log('appointments', appointments);  

  const interviewers = getInterviewersForDay(state, state.day)
  // console.log('interviewers', interviewers);
  



  const listOfAppointments = appointments.map(appointment => <Appointment 
    key={appointment.id} 
    id={appointment.id} 
    time={appointment.time} 
    interview={appointment.interview} />)
    
    




  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.id);


    return (
      <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interviewers={interviewers}
      interview={interview}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}

      />
    );
  });



  return (
    <main className="layout">
      <section className="sidebar">
        
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days} day={state.day} setDay={setDay} 
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />


      </section>
      <section className="schedule">
        {schedule}
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
