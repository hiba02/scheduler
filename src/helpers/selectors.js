//Transforming Data with Selectors: Selectors

function getAppointmentsForDay (state, day) {
  const filteredDay = state.days.find(x => x.name === day);
  console.log(filteredDay)
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
module.exports = { getAppointmentsForDay };