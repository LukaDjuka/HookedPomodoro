import React, {useState} from 'react'
import Session from './Session';

function Tracker({sessions}){

    let sessionList = sessions.map(session => <Session stats={session}></Session>);
    let list = [{focusLength: 20, breakLength: 5, complete: true}, {focusLength: 20, breakLength: 5, complete: true}, {focusLength: 20, breakLength: 5, complete: true},{focusLength: 20, breakLength: 5, complete: true}];
    let thing = list.map(session => <Session stats={session}></Session>);
    // thing = <Session stats={{focusLength: 20, breakLength: 5, complete: true}}></Session>

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
                {thing}
                {/* {this.props.sessions.map(session => <Session stats={session}></Session>)} */}
            </div>
        </div>
    );
}

export default Tracker;