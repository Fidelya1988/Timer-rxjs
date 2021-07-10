import { useEffect } from "react";

import { fromEvent, interval, Subject } from "rxjs";
import {
  buffer,
  debounceTime,
  filter,
  map,
  takeUntil,
  tap,
} from "rxjs/operators";

export const useObservable = (
  wait,
  setIsWaiting,
  isWaiting,
  isRunning,
  setTimer
) => {
  useEffect(() => {
    if (wait && wait.current) {
      const click$ = fromEvent(wait.current, "click");
      const doubleClick$ = click$.pipe(
        buffer(click$.pipe(debounceTime(300))),
        map((clicks) => clicks.length),
        filter((length) => length === 2),
        tap(() => setIsWaiting(true))
      );

      const subscribe$ = new Subject();
      interval(1000)
        .pipe(takeUntil(subscribe$), takeUntil(doubleClick$))
        .subscribe(() => {
          !isWaiting && isRunning && setTimer((v) => v + 1000);
        });

      return () => {
        subscribe$.next();
        subscribe$.unsubscribe();
      };
    }
  }, [isRunning, isWaiting]);
};
