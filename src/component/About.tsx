import React from "react";

import "../App.css";
import A2HSButton from "../A2HSButton";

const About = ({aboutText, appName, children}: any) => {
    return (
        <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
            <A2HSButton/>
            <div className="about-message">
                <div className="app-logo" title={aboutText}>{appName}</div>
                <p>{aboutText}</p>
                {children}
            </div>
        </div>
    )
}

export default About;