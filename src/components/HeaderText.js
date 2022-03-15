import React, { useState } from "react";

function HeaderText({mode, lulu}){
    
    return (
        <div id="titleTextHolder">
            <h1 id="titleText">
                {lulu ? "❤❤❤ " : ""}
                {mode === "break" ? "Break" : "Focus"}
                {lulu ? " ❤❤❤" : ""}
            </h1>
        </div>
    );
}

export default HeaderText;
