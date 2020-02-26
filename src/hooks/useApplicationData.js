import { useState, useEffect, useReducer } from 'react';
import Axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function useApplicatoinData() {
  
  const [_, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  // const [state, dispatch] = useReducer(reducer,{
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });

  // //???????????????????????????????????????????????????
  const setDay = day => setState({ ...state, day });












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
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: {...interview}
    // };

    // console.log('bookInterview appointment', appointment);
    
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
    //Need to return entire Axio 
    return Axios.put(`/api/appointments/${id}`, {interview})
      .then((response)=>{
        console.log('response, ', response);
        // return response;
      })
      // .catch((error)=>{
      //   console.log(error);
      // })

      // ??????????????????????????//
      // transition to them when axios rejects the Promise in our save and destroy functions.


  }


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
      return Axios.delete(`/api/appointments/${id}`, { interview: null })
      .then((response)=>{
        console.log('response, ', response);
      })
      // .catch((error) => {
      //   console.log(error);
      // }
      // )
  
          // ??????????????????????????//
      // transition to them when axios rejects the Promise in our save and destroy functions.
  
    }

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
  

  return { state, setDay, bookInterview, cancelInterview };
}