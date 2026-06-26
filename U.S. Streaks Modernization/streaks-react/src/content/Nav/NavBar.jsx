import React from "react";
import { useSections } from "../Fetch";
import { Link, useLocation } from "react-router-dom"; // Used in deep-linking the Streaks tabs

//Loading screen
const loader = <div className="loader-overlay">
    <div className="noaa-header">
        <img alt="NOAA loader" src="https://www.ncei.noaa.gov/monitoring-content/lib/images/noaa-loader.gif"></img>
    </div>
</div>


function NavBar(){

    const sections = useSections();
    const location = useLocation(); // grab URL
    if (!sections || !location){
        return loader;
    }

    const selected = location.pathname.split("/")[1] || "mapping"; // clean the URL down to the last word (endpoint)

    return (
        <nav id="section-menu">
            <ul id="sections" className="tabs">
                {/** Traverse through the sections.json */}
                {Object.entries(sections).map(([key, value]) => (
                    <li key={key} className={`${selected === key ? "selected" : ""}`}>
                        <Link title={value} className="section-menu-link" to={key === "mapping" ? "/" : `/${key}`}>
                            {value}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );

}

export default NavBar;