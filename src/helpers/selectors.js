//Transforming Data with Selectors: Selectors

export function getAppointmentsForDay(state, day) {
  // console.log('getAppointmentsForDay', state);
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
  return resultArray;

}


//Thanks for Francis 
export function getInterview(state, interviewObject) {

  if(interviewObject === null){
    return null
  }
  const newInterview = {student: interviewObject.student}
  
  const interviewerId = interviewObject.interviewer


  newInterview.interviewer = state.interviewers[interviewerId]
  return newInterview

}





export function getInterviewersForDay(state, day) {

  // This take `state.days` which is an array and then
  // find `day` === `state.days.name`, where `day` comes from
  // parameter `day`. filteredDay = object
  const filteredDay = state.days.find(x => x.name === day);
  
  if (!filteredDay) {
    return [];
  }


  const interviewerIdsForTheDay = filteredDay.interviewers;

  let resultArray = [];
  for (let id of interviewerIdsForTheDay) {
    resultArray.push(state.interviewers[id]);
  }

  return resultArray;

}

