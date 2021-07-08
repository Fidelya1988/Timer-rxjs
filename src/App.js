import "./App.css";
import React, { useState, useEffect } from "react";
import { from, interval, fromEvent, Subject, fromEventPattern } from "rxjs";
import {
  map,
  delay,
  mergeMap,
  take,
  repeat,
  repeatWhen,
  takeUntil,
} from "rxjs/operators";

const secondsObserv = interval(1000);
const minutesObserv = interval(50 * 60);
const hoursObserv = interval(50 * 60 * 60);


const getTimeUnits = (timeUnits) => {
  return timeUnits.pipe(
    take(60),
    repeat(),
    mergeMap((val) => from([val]).pipe(delay((val) => val)))
  );
};

const useObservable = (observable, setter, isRunning, h) => {
  useEffect(() => {
    const wait$ = fromEvent(
      document.getElementById('wait'),
      'click'
    )
    const subscription = observable.pipe(takeUntil(wait$)).subscribe((result) => {
      setter(result);
      if (!isRunning) {
        subscription.unsubscribe();
      }
    });

    return () => subscription.unsubscribe();
  }, [isRunning]);
};

const App = () => {

  const [second, setseconds] = useState(0);
  const [minute, setMinutes] = useState(0);
  const [hour, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  с


  useObservable(getTimeUnits(secondsObserv), setseconds, isRunning);
  useObservable(getTimeUnits(minutesObserv), setMinutes, isRunning);
  useObservable(getTimeUnits(hoursObserv), setHours, isRunning);

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
        <button id='wait'>
          Wait
        </button>
        <button >Reset</button>
      </div>
    </div>
  );
};

export default App;
