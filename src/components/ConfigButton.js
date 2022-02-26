import React, { useState } from "react";

function ConfigButton({text, callBack, currentlySelected}){
    const [beingPressed, setBeingPressed] = useState(false);

    function pressButton(e){
        setBeingPressed(true);
    }

    function liftButton(e){
        setBeingPressed(false);
    }

    //onMouseDown={pressButton} onMouseUp={liftButton}

    return (
        <button className={currentlySelected === text ? "selected commonButton" : "commonButton"} onClick={callBack}>
            {text}
        </button>
    );
}

export default ConfigButton;