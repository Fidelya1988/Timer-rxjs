// import "./App.css";
// import React, { useState, useEffect } from "react";
// import { useInterval } from "./useInterval";
// import {
//   from,
//   interval,
//   Observable,
//   fromEvent,
//   Subject,
//   timer,
//   switchMap,
// } from "rxjs";
// import {
//   renge,
//   delay,
//   map,
//   mergeMap,
//   take,
//   filter,
//   tap,
//   takeLast,
//   takeWhile,
//   scan,
//   reduce,
// } from "rxjs/operators";
// const seconds$ = new Observable((observer) => {
//   let seconds = 0
//   setInterval(() => {
//     observer.next(() => {(seconds + 1 )
//   }, 1000);
// });

// const WithRX = () => {
//   const [seconds, setSeconds] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
//   // function handleInterval() {
//   //   setSeconds((seconds) => (seconds < 60 ? seconds + 1 : 0));
//   // }
//   // useInterval(
//   //   () => {
//   //     handleInterval();
//   //   },
//   //   isRunning ? 1000 : null
//   // );
// //   const useObservable = (observable, setter) => {
// //     useEffect(() => {
// //       const subscription =observable.subscribe((result) => {
 

// //       return () => subscription.unsubscribe();
// //     }, []);
// //   });
// // useObservable(seconds$, setSeconds)
//   return (
//     <div className="App">
//       {/* <header className="App-header">
//         {seconds < 10 ? `0${seconds}` : seconds}
//       </header>
//       {isRunning ? (
//         <button
//           onClick={() => {
//             setIsRunning(false);
//             setSeconds(0);
//           }}
//         >
//           Stop
//         </button>
//       ) : (
//         <button
//           onClick={() => {
//             setIsRunning(true);
//           }}
//         >
//           Start
//         </button>
//       )}
//       <button
//         onClick={() => {
//           setIsRunning(false);
//         }}
//       >
//         Wait
//       </button>
//       <button
//         onClick={() => {
//           setSeconds(0);
//         }}
//       >
//         Reset
//       </button> */}
//     </div>
//   );
// };

// export default WithRX;
