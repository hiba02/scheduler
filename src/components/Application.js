import React, { useState, useEffect } from "react";
import "./Application.scss";
import DayList from "./DayList";
// import  from "react";
import Appointment from "./Appointment/index";
import Axios from "axios";


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

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
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState({...state, days});
  // setState(prev => ({ ...prev, days }));
  // console.log('state, setState', state, setState)
  const listOfAppointments = appointments.map(appointment => <Appointment 
    key={appointment.id} 
    id={appointment.id} 
    time={appointment.time} 
    interview={appointment.interview} />)
    
    
  // W07D2: Requesting the Days  
  useEffect(() => {

    Axios.get(`http://localhost:8001/api/days`)
    .then((response) => {
      // console.log(response.data)
      setDays(response.data);
      
    });
  },[]);  


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
        {listOfAppointments}
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
