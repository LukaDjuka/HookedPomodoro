import React, { useState } from "react";

function HeaderText(props){
    
    return (
        <div id="titleTextHolder">
            <h1 id="titleText">
                {props.mode === "break" ? "Break" : "Focus"}
            </h1>
        </div>
    );
}

export default HeaderText;
