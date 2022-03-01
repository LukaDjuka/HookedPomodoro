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

  function timerFinished(){
    if (mode == "focus"){
      setMode("break");
    }
    else{
      setMode("focus");
    }
    setIsCounting(false);
  }

  function toggleSessionDetails(){
    setShowSessionDetails(!showSessionDetails);
  }

  function setNewCurrentTime(time){
    setCurrentSession({"time": time})
  }

  function startCounting(){
    setIsCounting(true);
  }


// Continue from using this link: https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/ to create the timer and setup the buttons at the bottom of the page
// Use the above link to try to get the styling of the countdown to be correct. Otherwise look into this to actually create the timer logic: https://www.digitalocean.com/community/tutorials/react-countdown-timer-react-hooks
// Although I think my setInterval approach should work I just need to iron out the kinks
// For some reason the timeLeft variable never decreases eventhough I'm using a statehook to decrease it. Perhaps it's some sort of local memory to when the interval started??
  
// NEXT STEPS END OF FEB 22 - style the button. Make it work properly. As of right now I keep track of current mode and the next upcoming mode.
// This is because when the use presses Start within the Timer it has to know which mode to change it to within the callback inside Pomodor.js. Therefore it needs to know which node needs to be next.
// Becacuse the time doesnt need to keep track of the mode. In fact I could maybe switch it to just use the "counting" state variable which I created inside the component.
// Then can implement buttons and make sure they they each set the correct session variable info.

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
          <input type="text" id="inputSelection"></input>
          <ConfigButton text="Custom" currentlySelected={currentlySelectedButton} callBack={() => {setNewCurrentTime(10*60); setCurrentlySelectedButton("10:00")}}></ConfigButton>
        </div>
    </div>
  );


  // This is where I found the pulsing ideas:
  //Get rid of buttons and add a pulsing effect? 
// like: https://css-tricks.com/recreating-apple-watch-breathe-app-animation/
// or 
// https://www.florin-pop.com/blog/2019/03/css-pulse-effect/

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
        <Timer time={currentSession.time} timerStarted={startCounting} timerFinished={timerFinished}></Timer>
      </div>
      {!isCounting ? buttonsHolder : pulseSkipHolder}
    </div>
  );
}

export default Pomodoro;
