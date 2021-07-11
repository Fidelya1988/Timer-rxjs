import React, { useRef, useState } from "react";
import styles from "./app.module.css";

import Buttons from "./Buttons";
import { useObservable } from "./useObservable";

const App = () => {
  const wait = useRef();
  const [isWaiting, setIsWaiting] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

   useObservable(wait, setIsWaiting, isWaiting, isRunning, setTimer)
 
   const startHandler = () => {
    if (isWaiting) {
      setIsWaiting(false);
   ;
    } else {
      setIsRunning(!isRunning);
      setTimer(0);
    }
  };

  const resetHandler = () => {
    setTimer(0);
    setIsWaiting(false);
  };

  return (
    <div className={styles.timer}>
      <p>{new Date(timer).toISOString().slice(11, 19)}</p>

      <div>
        <Buttons
          isRunning={isRunning}
          isWaiting={isWaiting}
          start={startHandler}
          reset={resetHandler}
          wait={wait}
        />
      </div>
    </div>
  );
};

export default App;
