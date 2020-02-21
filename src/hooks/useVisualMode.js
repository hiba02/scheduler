import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  const transition = function(newMode, replace = false) {




      
      
      // setMode(newMode);
      
       
      // replace ?  setMode(history[history.length - 2]): setMode(newMode) 
      if (replace === true) {
        setMode(newMode);
      
      } else {
        // setMode(history[history.length - 1])
        history.push(newMode);
        setHistory(history);
        setMode(newMode);
      }

      console.log('newMode', newMode);
    // console.log('transition: ', history);

  };



  const back = function() {
    
    if (history.length > 1) {
      
      history.pop();
      setHistory(history)
      console.log('history', history);
      setMode(history[history.length - 1]);
      // console.log('back: ', old);
    }
  }; 

  return { mode, transition, back };
}

