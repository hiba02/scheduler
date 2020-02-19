import React from "react";
// import "./DayListItem.scss";
import DayListItem from "./DayListItem"



export default function DayList(props) {
  // console.log('DayList props', props);
  // console.log('DayList props days', props.days);
 /* 
 prop.days is...
 console.log('DayList props days', props.days)
  (3) [{…}, {…}, {…}]
0: {id: 1, name: "Monday", spots: 2}
1: {id: 2, name: "Tuesday", spots: 5}
2: {id: 3, name: "Wednesday", spots: 0}
  */
  const dayList = props.days.map(day => 

   
      <DayListItem  
      key={day.id}
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={props.setDay} 
      />
    
  
  );


  return <ul>{dayList}</ul>;
}
