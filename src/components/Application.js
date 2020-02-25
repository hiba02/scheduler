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
  // console.log("appointments", appointments);
  // 0: {id: 1, time: "12pm", interview: null}
  // 1: {id: 2, time: "1pm", interview: null}
  // 2: {id: 3, time: "2pm", interview: null}
  // 3: {id: 4, time: "3pm", interview: null}
  // 4:
  // id: 5
  // interview: {student: "Archie Cohen", interviewer: 7}
  // time: "4pm"

  const interviewers = getInterviewersForDay(state, state.day)
  // console.log("interviewrs", interviewers);
  // 0: {id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg"}
  // 1: {id: 7, name: "Alec Quon", avatar: "https://i.imgur.com/3tVgsra.jpg"}
  // 2: {id: 8, name: "Viktor Jain", avatar: "https://i.imgur.com/iHq8K8Z.jpg"}
  // 3: {id: 9, name: "Lindsay Chu", avatar: "https://i.imgur.com/nPywAp1.jpg"}
  // 4: {id: 10, name: "Samantha Stanic", avatar: "https://i.imgur.com/okB9WKC.jpg"}



  //W07D3: Creating Appointments
  function bookInterview(id, interview) {
    console.log(interview.interviewer)
    // console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: {...interview}
    // };

    console.log('bookInterview appointment', appointment);
    
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };
    // console.log('bookInterview appointments', appointments);
    setState({
      ...state,
      appointments
    });
    // console.log("bookinterview appointment", appointment);
    // console.log("bookinterview appointments", appointments);
    
    
    //axios.put(url[, data[, config]]) //interview -> type: should be object
    Axios.put(`/api/appointments/${id}`, {interview})
      .then((response)=>{
        console.log('response, ', response);
      }).catch((error)=>{
        console.log(error);
      })

      // ??????????????????????????//
      // transition to them when axios rejects the Promise in our save and destroy functions.


  }

  // use the appointment id to find the right appointment slot and set it's interview data to null.
  // console.log("aaaaaaaaaa", appointments);
  function cancelInterview (id) {
  //   if (appointments.interviewers.id === id) {
  //     // appointments
  //   }
  //   console.log('cancelInterview',id);
    // console.log('cancelInterview, ',id);
    // console.log('cancelInterview ', appointments);
    // const appointForDelete = appointments.find(apt => apt.id === id);
    // console.log('appointForDelete', appointForDelete);
    // appointForDelete.interview = null;

    //axios.put(url[, data[, config]]) //interview -> type: should be object
    Axios.delete(`/api/appointments/${id}`, { interview: null })
    .then((response)=>{
      console.log('response, ', response);
    })
    .catch((error) => {
      console.log(error);
    })

        // ??????????????????????????//
    // transition to them when axios rejects the Promise in our save and destroy functions.

  }



  const listOfAppointments = appointments.map(appointment => <Appointment 
    key={appointment.id} 
    id={appointment.id} 
    time={appointment.time} 
    interview={appointment.interview} />)
    
    
  // W07D2: Requesting the Days  
  useEffect(() => {
    Promise.all([
      Axios.get(`/api/days`),
      Axios.get(`/api/appointments`),
      Axios.get(`/api/interviewers`)
    ])
    .then((response) => {
      // console.log(response)
      // setDays(response.data);
      const [days, appointments, interviewers] = response;
      // console.log('response', response);
      // console.log(days.data, appointments.data);
      //??????????????????????????????????????????????????????//
      setState(prevState => ({ ...prevState, days: days.data, appointments:appointments.data, interviewers:interviewers.data}));

    });
  },[]);  


  // const appointments = getAppointmentsForDay(state, day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.id);
    // console.log('yoiooooo', appointment, interview)
    // console.log('yoiooooo', interview)

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
