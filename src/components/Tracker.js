import React, {useState} from 'react'
import Session from './Session';

function Tracker({sessions}){

    let sessionList = sessions.map(session => <Session focusLength={session.focus} breakLength={session.break} didComplete={session.didComplete}></Session>);

    return (
        <div id="trackerBox">
            <div id="trackerTopBar">
                <div className="top-bar-splitter">
                    Tracker
                </div>
                <div className="top-bar-splitter">
                    Status
                </div>
            </div>
            <div id="trackerStats">
                {sessionList.length ? sessionList : <p id="noSessionHistoryText">No Session History Yet</p>}
            </div>
        </div>
    );
}

export default Tracker;