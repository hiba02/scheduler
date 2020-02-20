//Transforming Data with Selectors: Selectors

export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.find(x => x.name === day);
  // console.log("filteredDay",filteredDay)
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

export function getInterview(state, interview) {
  let obj = {};
  // console.log(state.appointments);
  // console.log('state.appointments.interview',state.appointments["3"].interview);
  if (interview==null){
    return null;
  }
  for (let id in state.appointments){
    if (state.appointments[id].interview) {
      // console.log(state.appointments[id].interview.student);
      obj.student=state.appointments[id].interview.student;
      // obj.interviewer=state.interviewers
    }

  }
  for (let number in state.interviewers) {
    obj.interviewer = state.interviewers[number];
  }

  return obj;
}

// module.exports = { getAppointmentsForDay, getInterview } 



