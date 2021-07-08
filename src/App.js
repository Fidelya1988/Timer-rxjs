import "./App.css";
import React, { useState, useEffect } from "react";
import { from, interval } from "rxjs";
import {
  map,
  delay,
  mergeMap,
  take,
  repeat,
  repeatWhen,
  fromEvent,
} from "rxjs/operators";

const secondsObserv = interval(50);
const minutesObserv = interval(50 * 60);
const hoursObserv = interval(50 * 60 * 60);

const getTimeUnits = (timeUnits) => {
  return timeUnits.pipe(
    take(60),
    repeat(),
    mergeMap((val) => from([val]).pipe(delay((val) => val)))
  );
};

const useObservable = (observable, setter) => {
  useEffect(() => {
    const subscription = observable.subscribe((result) => {
      setter(result);
    });

    return () => subscription.unsubscribe();
  }, []);
};

const App = () => {
  const [second, setseconds] = useState(0);
  const [minute, setMinutes] = useState(0);
  const [hour, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useObservable(getTimeUnits(secondsObserv), setseconds);
  useObservable(getTimeUnits(minutesObserv), setMinutes);
  useObservable(getTimeUnits(hoursObserv), setHours);

  return (
    <div className="App">
      <span>{hour < 10 ? `0${hour}` : hour} : </span>
      <span>{minute < 10 ? `0${minute}` : minute} : </span>
      <span>{second < 10 ? "0" + second : second} </span>
      <div>
        {!isRunning ? (
          <button
            onClick={() => {
              setIsRunning(true);
            }}
          >
            Start
          </button>
        ) : (
          <button
            onClick={() => {
              setIsRunning(false);
            }}
          >
            Stop
          </button>
        )}
        <button>Wait</button>
        <button>Reset</button>
      </div>
    </div>
  );
};

export default App;
