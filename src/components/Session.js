import React from 'react'

function Session({focusLength, breakLength, didComplete}){

    function formulateSentence(timeLength){
        let sentence;
        let hours = Math.floor(timeLength / 3600);
        let minutes = Math.floor((timeLength % 3600) / 60);
        let seconds = timeLength % 60;

        const hoursNoun = hours >= 2 ? "hours" : "hour";
        const minutesNoun = minutes >=2 ? "minutes" : "minute";
        const secondsNoun = seconds >= 2 ? "seconds" : "second";

        return `${hours ? hours + hoursNoun : ''} ${minutes ? minutes + minutesNoun : ''} ${seconds ? seconds + secondsNoun : ''}`;
    }
    
    
    return (
        <div className="session-holder">
            <div className="session-info">
                <div className="session-focus-text">
                    {formulateSentence(focusLength) + " focus"}
                </div>
                <div className="session-break-text">
                    {breakLength ? '+' + formulateSentence(breakLength) + " break": " ... "}
                </div>
            </div>
            <div className="session-checkbox-holder">
                <input type="checkbox" checked={didComplete} disabled></input>
            </div>
        </div>
    );
}

export default Session;