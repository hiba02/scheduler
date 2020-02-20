//Transforming Data with Selectors: Selectors

function getAppointmentsForDay (state, day) {
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
  console.log("getappointmentsforday",resultArray)
  return resultArray;

}
module.exports = { getAppointmentsForDay };