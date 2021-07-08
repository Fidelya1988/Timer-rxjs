import "./App.css";
import React, { useState, useEffect } from "react";
import { from, interval, Observable, fromEvent, Subject, timer, switchMap   } from "rxjs";
import {
  renge,
  delay,
  map,
  mergeMap,
  take,
  filter,
  tap,
  takeLast,
  takeWhile,
  scan, reduce
} from "rxjs/operators";

const buttonListener = (e, setter) => {
  const el = e.target;
  fromEvent(el, "click").subscribe(() => {
    const stream$ = new Subject();
    stream$.subscribe();
  });
};

fromEvent(document, 'click')
.pipe(switchMap(e=>{
 return interval(1000).pipe(
   take(5),
   reduce((acc, v)=>acc+v, 0)
    
)
  })
)
.subscribe(
 {
  next: (v) => console.log("Next", v),
  complete: (v) => console.log("Complete")
    
})
// const stream$ = interval(1000).pipe(
//   // tap((v) => console.log("tap" + v)),
//   // map((v) => v * 2),
//   // filter((v) => v % 3 === 0),
//   take(5),
//   // scan(),
//   // takeWhile((v) => v < 7),
//   // takeLast(2)
//   // scan((acc, v)=>acc+v, 0),
//   reduce((acc, v)=>acc+v, 0)
// );
// stream$.subscribe({
//   next: (v) => console.log("Next", v),
//   complete: (v) => console.log("Complete"),
// });
const Test = () => {
  const [second, setseconds] = useState(0);

  const handleClick = () => {};

  return (
    <div className="App">
      <span>{second < 10 ? `0${second}` : second} : </span>

      <div>
        <button onClick={handleClick}>Start</button>
        <button onClick={() => {}}>Stop</button>
        <button onClick={(e) => buttonListener(e, setseconds)}>Wait</button>
        <button>Reset</button>
      </div>
    </div>
  );
};

export default Test;
