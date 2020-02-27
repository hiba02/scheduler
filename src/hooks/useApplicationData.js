import { useState, useEffect, useReducer } from 'react';
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";


function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day}
    case SET_APPLICATION_DATA:
      return { ...state, days:action.days, appointments:action.appointments, interviewers:action.interviewers }
    case SET_INTERVIEW: 
      console.log("setInterview", state)  
    return { ...state, id:action.id, interview:action.interview }
    
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

    
    //axios.put(url[, data[, config]]) //interview -> type: should be object
    //Need to return entire Axio 
    return axios.put(`/api/appointments/${id}`, {interview})
      .then((response)=>{
        console.log(' bookInterview response, ', response);
        dispatch({ type: SET_INTERVIEW, id: id.data, interview: interview.data });
      })
      //???Why id.data??

  }


  function cancelInterview (id) {

  
      //axios.put(url[, data[, config]]) //interview -> type: should be object
      return axios.delete(`/api/appointments/${id}`, { interview: null })
      .then((response)=>{
        console.log('cancelInterview response, ', response);
      })

    }

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ])
    .then((response) => {
      // *** I should use object.data to receive the response from axios 
      const [days, appointments, interviewers] = response;
      console.log("useEffect",response)
      dispatch({ type: SET_APPLICATION_DATA, days: days.data, appointments: appointments.data, interviewers: interviewers.data });

      //????
      // setState(prevState => ({ ...prevState, days: days.data, appointments:appointments.data, interviewers:interviewers.data}));

    });
  // },[state.days]);  
},[]);  

  return { state, setDay, bookInterview, cancelInterview };
}