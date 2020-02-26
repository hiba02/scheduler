//Transforming Data with Selectors: Selectors

export function getAppointmentsForDay(state, day) {
  console.log('getAppointmentsForDay', state);
  const filteredDay = state.days.find(x => x.name === day);
  console.log("filteredDay",filteredDay)
  if (!filteredDay) {
    return [];
  }
  const appointmentsOfTheDay = filteredDay.appointments;
  let resultArray = [];
  for (let id of appointmentsOfTheDay) {
    resultArray.push(state.appointments[id]);
  }
  // console.log("getappointmentsforday",resultArray)
  return resultArray;

}
//????????????????????????????????????????????????????????????
//Thanks for Francis 
export function getInterview(state, appointmentId) {
  let newAppointment = {...state.appointments[appointmentId]};
  // console.log('hellooooooo newAppointment', newAppointment)
  //   {id: 1, time: "12pm", interview: {…}}
        // id: 1
        // interview: {student: "Yoon", interviewer: {…}}
        // time: "12pm"
        // {id: 2, time: "1pm", interview: {…}}
        // {id: 3, time: "2pm", interview: {…}}
        // {id: 4, time: "3pm", interview: {…}}
        // {id: 5, time: "4pm", interview: null}
        // ......


  // console.log(state.appointments);
  // console.log('state.appointments.interview',state.appointments["3"].interview);
  if (!newAppointment.interview){
    return null;
  }
  const interviewerId = newAppointment.interview.interviewer
  // console.log('newAppointment.interview.interviewer',newAppointment.interview.interviewer);
  // console.log('interviewerId', interviewerId); //3, 5, 5, 7
  newAppointment.interview.interviewer = state.interviewers[interviewerId]

  if(interviewerId){
    // console.log('inside if',newAppointment.interview)
    // {student: "Yoon", interviewer: {…}}interviewer: undefinedstudent: "Yoon"__proto__: Object
    // {student: "Archie Cohen", interviewer: {…}}
    // {student: "CHicken", interviewer: {…}}
    // only student name who match with interviewer
    return newAppointment.interview
  }
  else{
    return undefined
  }


  // for (let id in state.appointments){
  //   if (state.appointments[id].interview) {
  //     // console.log(state.appointments[id].interview.student);
  //     newAppointment.student=state.appointments[id].interview.student;
  //     // newAppointment.interviewer=state.interviewers
  //   }

  // }

  // for (let number in state.interviewers) {
  //   newAppointment.interviewer = state.interviewers[number];
  // }

}

// module.exports = { getAppointmentsForDay, getInterview } 



export function getInterviewersForDay(state, day) {
  // console.log('getInterviewersForDay', state);
  
  const filteredDay = state.days.find(x => x.name === day);
  // console.log("filteredDay",filteredDay)
  if (!filteredDay) {
    return [];
  }

  const interviewersForDay = filteredDay.interviewers;
  let resultArray = [];
  for (let id of interviewersForDay) {
    resultArray.push(state.interviewers[id]);
  }
  // console.log("getInterviewersForDay",resultArray)
  return resultArray;

}