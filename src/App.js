import React, { useRef, useState, useCallback } from "react";
import styles from "./app.module.css";

import Buttons from "./Buttons";
import { useObservable } from "./useObservable";
const Ticker = ({ timer }) => {
  return <p>{new Date(timer).toISOString().slice(11, 19)}</p>;
};

const App = React.memo(() => {
  console.log("render");
  const wait = useRef();
  
  const [isWaiting, setIsWaiting] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
 
  useObservable(wait, setIsWaiting, isWaiting, isRunning, setTimer);
  
  const start = useCallback(() => {
    if (isWaiting) {
      setIsWaiting(false);
    } else {
      setIsRunning(!isRunning);
      setTimer(0);
    }
  }, []);

  const reset = useCallback(() => {
    setTimer(0);
    setIsWaiting(false);
  }, []);

  return (
    <div className={styles.timer}>
      <Ticker timer={timer} />

      <div>
        <Buttons
          isRunning={isRunning}
          isWaiting={isWaiting}
          start={start}
          reset={reset}
          wait={wait}
        />
      </div>
    </div>
  );
});

export default App;
