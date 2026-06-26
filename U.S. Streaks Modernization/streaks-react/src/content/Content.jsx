import React, { useState } from "react";
import NavBar from "./Nav/NavBar";
import Overview from "./Overview/Overview";
import Mapping from "./Mapping/Mapping";

import { Routes, Route, useLocation } from "react-router-dom"; // used in deep-linking the tabs to each other

function Content() {
    
    //loading screen
    const loader = <div className="loader-overlay">
        <div className="noaa-header">
            <img alt="NOAA loader" src="https://www.ncei.noaa.gov/monitoring-content/lib/images/noaa-loader.gif"></img>
        </div>
    </div>

    // Grab URL from the browser
    const location = useLocation();
    if (!location) {
        return loader;
    }

    // define the valid endpoints
    const validPaths = [ "/", "/overview", "mapping" ];
    // validate the URL has a valid endpoint
    const is404 = !validPaths.includes(location.pathname);

    return (
        <>
            {!is404 && <NavBar />}
            <Routes>
                <Route path="/" element={<Mapping />} />
                <Route path="/overview" element={<Overview />} />
                {/**<Route path="*" element={ErrorPage />} /> */}
            </Routes>
        </>
    );
}


export default Content;
