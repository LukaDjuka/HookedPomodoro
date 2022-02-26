import React, { useState } from "react";

function ConfigButton({text, callBack}){
    const [beingPressed, setBeingPressed] = useState(false);

    function pressButton(e){
        setBeingPressed(true);
    }

    function liftButton(e){
        setBeingPressed(false);
    }
    
    return (
        <button className={beingPressed ? "beingPressed commonButton" : "commonButton"} onClick={callBack} onMouseDown={pressButton} onMouseUp={liftButton}>
            {text}
        </button>
    );
}

export default ConfigButton;