import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState( [initial] );


  const transition = function(newMode, replace = false) {
 
    if (replace === true) {
      setMode(newMode);
    
    } else {
      history.push(newMode);
      setHistory(prev => ([...prev, mode]));
      setMode(newMode);
    }

    // console.log('newMode', newMode);
  };



  const back = function() {
    
    if (history.length > 1) {
      
      history.pop();
      setHistory(prev => ([...prev, mode]))
      // console.log('history', history);
      setMode(history[history.length - 1]);
      // console.log('back: ', old);
    }
  }; 

  return { mode, transition, back };
}

