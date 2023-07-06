
import "../App.css";
const About = ({aboutText, appName, children}: any) => {
    return (
        <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
            <div className="about-message">
                <div className="app-logo" title={aboutText}>{appName}</div>
                <p>{aboutText}</p>
                {children}
            </div>
        </div>
    )
}

export default About;