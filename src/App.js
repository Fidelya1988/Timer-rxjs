import "./App.css";
import React, { useState, useEffect } from "react";
import {
  from,
  interval,
  fromEvent,
  Subject,
  fromEventPattern,
  takeWhen,
} from "rxjs";
import {
  map,
  delay,
  mergeMap,
  take,
  repeat,
  repeatWhen,
  takeUntil,
  switchMap,
  delayWhen,
  mapTo,
 mergeWith,
 startWith
} from "rxjs/operators";

const secondsObserv = interval(1000);
const minutesObserv = interval(50 * 60);
const hoursObserv = interval(50 * 60 * 60);
const getElem = (id) => document.getElementById(id);

const fromClick = (id) => fromEvent(getElem(id), "click");
const fromClickAndMapTo = (id, obj) => fromClick(id).pipe(mapTo(obj));

const setValue = (val) => (getElem("counter").innerText = val.toString());

const getTimeUnits = (timeUnits) => {
  return timeUnits.pipe(
    take(60),
    repeat(),
    mergeMap((val) => from([val]).pipe(delay((val) => val)))
  );
};

const useObservable = (observable, setter, setIsRunning, isRunning) => {
  useEffect(() => {
    const events$ = mergeWith(
      fromClickAndMapTo("start", { count: true }),
      fromClickAndMapTo("wait", { count: false }),
      fromClickAndMapTo("reset", { value: 0 })
    );

    // const timer$ = events$().pipe(startWith({ count: false, speed: 1000, value: 0, countup: true, increase: 1 }))
   
  }, []);
};
// const start$ = fromEvent(document.getElementById("start"), "click").pipe(
//   switchMap((e) => observable)
// )
// const sub2 = start$.subscribe((result) => {
//   setter(result);
//   setIsRunning(true);

// if (!isRunning) {
//   sub2.unsubscribe();
// }

// })
// const reset$ = fromEvent(document.getElementById("reset"), "click").pipe(
//   switchMap((e) => observable)
// );
// const subscription = reset$.subscribe((result) => {
//   setter(result);
//   setIsRunning(true);
//   sub2.complete()
// });
// return () => {subscription.unsubscribe()
// sub2.unsubscribe()};
//
//   []);
// };

const App = () => {
  const [second, setseconds] = useState(0);
  // const [minute, setMinutes] = useState(0);
  // const [hour, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useObservable(getTimeUnits(secondsObserv), setseconds, setIsRunning);
  // useObservable(getTimeUnits(minutesObserv), setMinutes, setIsRunning);
  // useObservable(getTimeUnits(hoursObserv), setHours, setIsRunning);

  return (
    <div className="App">
      {/* <span>{hour < 10 ? `0${hour}` : hour} : </span>
      <span>{minute < 10 ? `0${minute}` : minute} : </span> */}
      <span>{second < 10 ? "0" + second : second} </span>
      <div>
        <button
          id="start"
          onClick={() => {
            // isRunning ? setIsRunning(false) : setIsRunning(true);
          }}
        >
          {isRunning ? "Stop" : "Start"}
        </button>

        <button
          id="wait"
          onClick={() => {
            setIsWaiting(true);
          }}
        >
          Wait
        </button>
        <button id="reset">Reset</button>
      </div>
    </div>
  );
};

export default App;
