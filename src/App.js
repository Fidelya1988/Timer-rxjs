
import React, {useEffect, useRef, useState} from 'react';
import {fromEvent, interval, Subject, Observable} from 'rxjs';
import {buffer, debounceTime, filter, map, takeUntil, tap} from "rxjs/operators";

 const App = () => {

    const wait = useRef(null);
    const [isWaiting, setIsWaiting] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);


    useEffect(() => {
        if (wait && wait.current) {
            const click$ = fromEvent(wait.current, 'click');
            const doubleClick$ = click$.pipe(
                buffer(click$.pipe(debounceTime(300))),
                map(clicks => clicks.length),
                filter(length => length === 2),
                tap(() => setIsWaiting(true))
            )

            const subscribe$ = new Observable();
            interval(1000)
                .pipe(
                    takeUntil(subscribe$),
                    takeUntil(doubleClick$)
                )
                .subscribe(() => {
                    !isWaiting && isRunning && setTimer(v => v + 1000)
                });

            return () => {
                subscribe$.next();
                subscribe$.complete();
                subscribe$.unsubscribe();
            };
        }
    }, [isRunning, isWaiting]);

    const start = () => {
        if (isWaiting) {
            setIsWaiting(false)
        } else {
            setIsRunning(!isRunning);
            setTimer(0)
        }
    }

    const reset = () => {
        setTimer(0);
        setIsWaiting(false)
    }

    return <div className={'wrapper'}>
        <h1>{new Date(timer).toISOString().slice(11, 19)}</h1>

        <div>
            <button  onClick={start}>{!isRunning| isWaiting? 'Start' : 'Stop'}</button>
            <button  ref={wait}>Wait</button>
            <button  onClick={reset}>Reset</button>
        </div>
    </div>
}

export default App