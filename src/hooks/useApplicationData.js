import { useState, useEffect, useReducer } from 'react';
import Axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";


function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day}
    case SET_APPLICATION_DATA:
      return { ...state, days:action.days, appointments:action.appointments, interviewers:action.interviewers }
    case SET_INTERVIEW: {
      return /* insert logic */
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}


export default function useApplicatoinData() {

  const [state, dispatch] = useReducer(reducer,{
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => dispatch({ type: SET_DAY, day })

  function bookInterview(id, interview) {
    // console.log(interview.interviewer)
    // console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };



    // setState({
    //   ...state,
    //   appointments
    // });



    // dispatch({ type: SET_DAY, day });

    // dispatch({ type: SET_INTERVIEW, id, interview });
    // dispatch({ type: SET_INTERVIEW, id, interview: null });
    
    
    //axios.put(url[, data[, config]]) //interview -> type: should be object
    //Need to return entire Axio 
    return Axios.put(`/api/appointments/${id}`, {interview})
      .then((response)=>{
        console.log('response, ', response);

      })


  }


  function cancelInterview (id) {

  
      //axios.put(url[, data[, config]]) //interview -> type: should be object
      return Axios.delete(`/api/appointments/${id}`, { interview: null })
      .then((response)=>{
        console.log('response, ', response);
      })

    }

    useEffect(() => {
      Promise.all([
        Axios.get(`/api/days`),
        Axios.get(`/api/appointments`),
        Axios.get(`/api/interviewers`)
      ])
      .then((response) => {

        const [days, appointments, interviewers] = response;
        dispatch({ type: SET_APPLICATION_DATA, days: days.data, appointments: appointments.data, interviewers: interviewers.data });

        //????
        // setState(prevState => ({ ...prevState, days: days.data, appointments:appointments.data, interviewers:interviewers.data}));
  
      });
    },[]);  
  

  return { state, setDay, bookInterview, cancelInterview };
}