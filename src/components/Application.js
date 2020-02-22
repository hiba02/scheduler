import React, { useState, useEffect } from "react";
import "./Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import Axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";




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

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // console.log('state',state);
  //state {day: "Monday", days: Array(0), appointments: {…}}
  const setDay = day => setState({ ...state, day });

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day)


  //W07D3: Creating Appointments
  function bookInterview(id, interview) {
    console.log(id, interview);
  }




  const listOfAppointments = appointments.map(appointment => <Appointment 
    key={appointment.id} 
    id={appointment.id} 
    time={appointment.time} 
    interview={appointment.interview} />)
    
    
  // W07D2: Requesting the Days  
  useEffect(() => {
    Promise.all([
      Axios.get(`http://localhost:8001/api/days`),
      Axios.get(`http://localhost:8001/api/appointments`),
      Axios.get(`http://localhost:8001/api/interviewers`)
    ])
    .then((response) => {
      // console.log(response)
      // setDays(response.data);
      const [days, appointments, interviewers] = response;
      console.log('response', response);
      // console.log(days.data, appointments.data);
      //??????????????????????????????????????????????????????//
      setState(prev => ({ ...state, days: days.data, appointments:appointments.data, interviewers:interviewers.data}));
    });
  },[]);  


  // const appointments = getAppointmentsForDay(state, day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        bookInterview={bookInterview}
        interviewers={interviewers}
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
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
