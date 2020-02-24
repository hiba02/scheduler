//Transforming Data with Selectors: Selectors

export function getAppointmentsForDay(state, day) {
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

export function getInterview(state, appointmentId) {
  let newAppointment = {...state.appointments[appointmentId]};
  console.log('hellooooooo', newAppointment)
  // console.log(state.appointments);
  // console.log('state.appointments.interview',state.appointments["3"].interview);
  if (!newAppointment.interview){
    return null;
  }

  console.log(newAppointment)
  const interviewerId = newAppointment.interview.interviewer
  newAppointment.interview.interviewer = state.interviewers[interviewerId]

  if(interviewerId){

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