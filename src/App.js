
import React, {useEffect, useRef, useState} from 'react';
import {fromEvent, interval, Subject} from 'rxjs';
import {buffer, debounceTime, filter, map, takeUntil, tap} from "rxjs/operators";

 const App = () => {

    const wait = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const [ticker, setTicker] = useState(0);
    const [isStarted, setIsStarted] = useState(false);


    useEffect(() => {
        if (wait && wait.current) {
            const click$ = fromEvent<Event>(wait.current, 'click');
            const doubleClick$ = click$.pipe(
                buffer(click$.pipe(debounceTime(300))),
                map(clicks => clicks.length),
                filter(length => length === 2),
                tap(() => setIsPaused(true))
            )

            const subscribe$ = new Subject();
            interval(1000)
                .pipe(
                    takeUntil(subscribe$),
                    takeUntil(doubleClick$)
                )
                .subscribe(() => {
                    !isPaused && isStarted && setTicker(v => v + 1000)
                });

            return () => {
                subscribe$.next();
                subscribe$.complete();
            };
        }
    }, [isStarted, isPaused]);

    const start = () => {
        if (isPaused) {
            setIsPaused(false)
        } else {
            setIsStarted(!isStarted);
            setTicker(0)
        }
    }

    const reset = () => {
        setTicker(0);
        setIsPaused(false)
    }

    return <div className={'wrapper'}>
        <h1>{new Date(ticker).toISOString().slice(11, 19)}</h1>

        <div>
            <button variant="contained" onClick={start}>Start/Stop</button>
            <button variant="contained" ref={wait}>Wait</button>
            <button variant="contained" onClick={reset}>Reset</button>
        </div>
    </div>
}

export default App