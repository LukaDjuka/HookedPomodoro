import React from 'react'

function Session(props){
    
    return (
        <div className="session-holder">
            <div className="session-info">
                <div className="session-focus-text">
                    {props.stats.focusLength} minute focus
                </div>
                <div className="session-break-text">
                    + {props.stats.breakLength} minute break
                </div>
            </div>
            <div className="session-checkbox-holder">
                <input type="checkbox" checked={props.stats.complete} disabled></input>
            </div>
        </div>
    );
}

export default Session;