import React, { useState } from 'react';
import HeaderText from './components/HeaderText';
import Tracker from './components/Tracker';
import Timer from './components/Timer';
import ConfigButton from './components/ConfigButton';
import './Pomodoro.css';
import './checkbox.css';

function Pomodoro() {
  const [mode, setMode] = useState("focus");
  const [showSessionDetails, setShowSessionDetails] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const [currentSession, setCurrentSession] = useState({time: 1500}); /* ex: {focusLength: 20, breakLength: 5, complete: true} */
  const [currentlySelectedButton, setCurrentlySelectedButton] = useState("25:00");
  const [customTime, setCustomTime] = useState(null);
  const [sessions, setSessions] = useState([]);

  function getBackgroundColor(){
    if (mode === null){
      return "limbo-background";
    }
    else if (mode === "focus"){
      return "focus-background";
    }
    else {
      return "break-background";
    }
  }

  function timerFinished(didSkip){
    if (mode == "focus"){
      let newSession = {"focus" : currentSession.time, "didComplete": (didSkip ? false: true)};
      setSessions([...sessions, newSession]);
      setMode("break");
    }
    else{
      let mostRecentSessionToUpdate = sessions[sessions.length - 1];
      mostRecentSessionToUpdate.break = currentSession.time
      setSessions(sessions);
      setMode("focus");
    }
    setIsCounting(false);
  }

  function timerSkipped(){
    timerFinished(true);
  }

  function toggleSessionDetails(){
    setShowSessionDetails(!showSessionDetails);
  }

  function setNewCurrentTime(time){
    if (Number(time)){
      setCurrentSession({"time": time})
    }
  }

  function startCounting(){
    setIsCounting(true);
  }

  function trackCustomTime(e){
    let customTimeInSeconds = 0;
    if (e.target.value.match(/^(\d+:)?(\d+:)?(\d+)$/g) != null){
      let timeHolder = e.target.value.split(":");
      let i = timeHolder.length - 1;
      let multiplier = 1;
      while (i >= 0){
        let number = Number(timeHolder[i])
        let secondConversion = (number * multiplier);
        customTimeInSeconds += secondConversion;
        multiplier = multiplier * 60;
        i--;
      }
    }
    if (customTimeInSeconds > 0){
      setCustomTime(customTimeInSeconds);
    }
  }



// Next thing to do is to make a custom time parameter that the use can provide and select.
// Make the selected time stay Pressed down as well as a slightly different color
// Make sure that the start button works as intended
// Try to make the circle bigger
// Tinker with the coloring of the page
// Record the sessions in the detailsHOlder

// Continue with simply stepping through each component and make sure they work before continuing with more additons

  const backgroundColor = getBackgroundColor();

  const buttonsHolder = (
    <div id="buttonsHolder">
        <ConfigButton text="25:00" currentlySelected={currentlySelectedButton} callBack={() => {setNewCurrentTime(25*60); setCurrentlySelectedButton("25:00")}}></ConfigButton>
        <ConfigButton text="15:00" currentlySelected={currentlySelectedButton} callBack={() => {setNewCurrentTime(15*60); setCurrentlySelectedButton("15:00")}}></ConfigButton>
        <ConfigButton text="10:00" currentlySelected={currentlySelectedButton} callBack={() => {setNewCurrentTime(10*60); setCurrentlySelectedButton("10:00")}}></ConfigButton>
        <div id="customButtonHolder">
          <input type="text" name="duration" id="inputSelection" placeholder="hh:mm:ss" pattern="^((\d+:)?\d+:)?\d*$" title="Custom time setting in the format of Hours, colon, minutes, colon, seconds " onChange={trackCustomTime}></input>
          <ConfigButton text="Custom" currentlySelected={currentlySelectedButton} callBack={() => {setNewCurrentTime(customTime); setCurrentlySelectedButton("Custom")}}></ConfigButton>
        </div>
    </div>
  );


  // This is where I found the pulsing ideas:
  //Get rid of buttons and add a pulsing effect? 
// like: https://css-tricks.com/recreating-apple-watch-breathe-app-animation/
// or 
// https://www.florin-pop.com/blog/2019/03/css-pulse-effect/

// Last thing I did was set up the custom time to work as intended! I only tested iwth basic inputs - needs more work in general

  const pulseSkipHolder = ( // This is gonna hold pulsating dots to simulate meditative breathing practices as well as two buttons. one for pausing and the other for Skipping the session. 
    <div id="boom"></div>
  );
  
  return (
    <div id="Pomodoro" className={backgroundColor}>
      <header className="Pomodoro-header">
        <HeaderText mode={mode}></HeaderText>
        
        <div id="sessionDetailsHolder">
          <div id="hamburgerHolder">
            <button id="hamburgerButton" onClick={toggleSessionDetails}><i className="fa-solid fa-bars"></i></button>
          </div>
          {showSessionDetails ? <Tracker sessions={sessions}></Tracker> : null}
        </div>
      </header>
      <div id="timerHolder">
        <Timer time={currentSession.time} timerStarted={startCounting} timerFinished={timerFinished} timerSkipped={timerSkipped}></Timer>
      </div>
      {!isCounting ? buttonsHolder : pulseSkipHolder}
    </div>
  );
}

export default Pomodoro;
