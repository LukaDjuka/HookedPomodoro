import React, { useState, useEffect, useRef } from 'react'
import ConfigButton from './ConfigButton';

function Timer({time, timerStarted, timerFinished, timerSkipped}){
    const [timeLeft, setTimeLeft] = useState(time);
    const [counting, setCounting] = useState(false);
    const [justPaused, setJustPaused] = useState(false);
    const [started, setStarted] = useState(false);
    const intervalRef = useRef();

    useEffect(() => {
        if (counting){
            intervalRef.current = setInterval(() => {
                setTimeLeft((t) => t - 1)
            }, 1000);
            
            return () => clearInterval(intervalRef.current);
        }
        else{
            if (justPaused){
                setTimeLeft(timeLeft);
                setJustPaused(false);
            }
            else{
                setTimeLeft(time);
            }
        }
    }, [counting, timeLeft, time]);

    useEffect(() => {
        if (timeLeft && timeLeft <= 0){
            // clearInterval(intervalRef.current);
            // setCounting(false);
            // timerFinished();
            endTimer();
        }
    }, [timeLeft]);

    function endTimer(didSkip){
        clearInterval(intervalRef.current);
        setCounting(false);
        setStarted(false);
        if (didSkip){
            timerSkipped();
        }
        else{
            timerFinished();
        }
    }

    function startTimer(){
        setCounting(true);
        setStarted(true);
        timerStarted();
    }

    function pauseTimer(){
        setCounting(!counting);
        setJustPaused(true);
    }

    function formatTimeString(time){
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10){
            seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`
    }

    function calculateTimeFraction(){
        const rawTimeFraction = timeLeft / time;
        return rawTimeFraction - (1 / time) * (1 - rawTimeFraction);
    }

    function setCircleDashArray(){
        const circleDashArray = (calculateTimeFraction() * 283).toFixed(0);
        return circleDashArray.toString() + " 283";
    }

    const COLOR_CODES = {
        info: {
            color: "green"
        }
    };

    let remainingPathColor = "timer-path-remaining " + COLOR_CODES.info.color;
    let display = started ? formatTimeString(timeLeft) : <ConfigButton text={"Start"} callBack={startTimer}></ConfigButton>;
    
    return (
        <div id="timer">
             <svg className="timer-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g className="timer-circle">
                    <circle className="timer-path-elapsed" cx="50" cy="50" r="45" />
                    <path id="timer-path-remaining" strokeDasharray={setCircleDashArray()} className={remainingPathColor}
                    d="
                    M 50, 50
                    m -45, 0
                    a 45,45 0 1,0 90,0
                    a 45,45 0 1,0 -90,0
                    "
                  ></path>
                </g>
            </svg>
            <span className="timer-label">
                {display}
            </span>
            <div id="pauseAndSkipHolder">
                {started ? (counting ? <ConfigButton text="Pause" callBack={pauseTimer}></ConfigButton> : <ConfigButton text="Resume" callBack={pauseTimer}></ConfigButton>) : null}
                <ConfigButton text="Skip" callBack={()=>{endTimer(true)}}></ConfigButton>
            </div>
        </div>
    )
}

export default Timer;