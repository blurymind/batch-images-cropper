import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Main from "./pages/Main"
import AboutPage from "./pages/AboutPage"

const appName = "⭐ Images Cropper ⭐"
const aboutText = `Created by Todor Imreorov aka blurymind@github --
    Crop your images without them ever leaving your computer.
    This application does NOT upload any images to a remote server.
`

const App: React.FC  = () => {
    return <Main appName={appName} aboutText={aboutText} />
    // todo pwa routing - maybe someday
  // return (
  //     <Router>
  //       <nav>
  //         {/*<ul>*/}
  //         {/*  <li>*/}
  //         {/*    <Link to="/">Home</Link>*/}
  //         {/*  </li>*/}
  //         {/*  <li>*/}
  //         {/*    <Link to="/about">About</Link>*/}
  //         {/*  </li>*/}
  //         {/*</ul>*/}
  //       </nav>
  //       <Routes>
  //         <Route index path="/about" element={<AboutPage appName={appName} aboutText={aboutText} />} />
  //         <Route path="/" element={<Main appName={appName} aboutText={aboutText} />} />
  //       </Routes>
  //   </Router>
  // )
}

export default App;
