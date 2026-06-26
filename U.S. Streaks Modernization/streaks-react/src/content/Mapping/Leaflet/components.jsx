import React, { useState, useEffect, useLayoutEffect } from "react";
import { useMap } from 'react-leaflet';
import { useParameters } from "../../Fetch";


// A component to control the map's view and zoom restrictions
export const MapController = ({ center, zoom }) => {

    const map = useMap();
    // Use a useEffect hook to update the view instantly when props change
    useEffect(() => {
        if (center && zoom) {
            map.setView(center, zoom);
        }
    }, [center, zoom, map]); // Dependencies ensure this runs when center or zoom change

    useLayoutEffect(() => {
        if (center && zoom) {
            map.setMinZoom(zoom);
        }
    }, [center, zoom, map])

    return null; // This component doesn't render anything itself
    
};
export default MapController;



// Logo Component
export const CornerLogo = ({ src, alt }) => {
    return (
        <div className="corner-noaa-logo">
            <img src={src} alt={alt} style={{ width: '100%', height: '100%' }} />
        </div>
    );
};



// Legend Component
export const Legend = ({ bins, colors }) => {
    return (
        <div className="legend-bar-div">
            <div className="color-bar">
                {colors.map((color, index) => (
                    <div 
                        key={index}
                        className="legend-color" 
                        style={{backgroundColor: color}}
                    ></div>
                ))}
            </div>
            <div className="number-bar">
                {bins.map((bin, index) => (
                    <div key={index} className="legend-number">
                        {Math.round(bin)}
                    </div>
                ))}
            </div>
        </div>
    );
};


// InfoBar component
export const InfoBar = ({ station, streak, date }) => {
    //Get Parameters
    const parameters = useParameters();
    if (!parameters) return null;

    const grammarCheck1 = date === "all-time" ? "Most" : "";

    return (
        <div className="info-bar-div">
            <div id="mapTitleDate">
                <span id="mapTitle">{grammarCheck1} Consecutive Days with {parameters[streak].title.replace("&deg;F","°F")}</span>
                <span id="dateDisplay">{frontendDate(date, "formal")}</span>
            </div>
            {station ? (
                    <div id="dataDisplay">
                        <strong>{station.location}, {station.state}</strong>: {station.streakLength} day(s) {" "}

                        {/** If rendering pecific date information, style the bar accordingly (to old site) */}
                        {station.parameter && <em>
                            (Record Streak: {station.dayStreak} day(s), {" "}
                            {frontendDate(station.begdate, "short")} - {frontendDate(station.enddate, "short")}) 
                        </em>}
                    </div>
                ) : 
                <div id="dataDisplay">
                    <em id="mapInstructions">Hover over a station</em>
                </div>
            }
        </div>
    );
};



export const ButtonContainer = () => {

    const map = useMap();
    const [showing, setShowing] = useState("conus");


    useEffect(() => {
        if (showing === "ak"){
            map.flyTo([64.2008, -149.4937], 4);
            setShowing("ak")
        };
        if (showing === "hi"){
            map.flyTo([19.8968, -155.5828], 6);
            setShowing("hi")
        };
        if (showing === "conus"){
            map.flyTo([39.8283, -98.5795], 4);
            setShowing("conus")
        };
    }, [showing]);

    useLayoutEffect(() => {
        if (showing === "ak"){
            map.setMinZoom(4);
        };
        if (showing === "hi"){
            map.setMinZoom(6);
        };
        if (showing === "conus"){
            map.setMinZoom(4);
        };
    }, [showing]);

    const zoomToChoice = (choice) => {
        if (showing !== choice) setShowing(choice);
    };

    return (
        <div className="us-multinav-div">
            <div>
                <button id="AK-flyToButton" className="btn flyToButton" onClick={() => zoomToChoice("ak")} disabled={showing === "ak"}>
                    Alaska
                </button>
                <button id="HI-flyToButton" className="btn flyToButton" onClick={() => zoomToChoice("hi")} disabled={showing === "hi"}>
                    Hawaii
                </button>
                <button id="US-flyToButton" className="btn flyToButton" onClick={() => zoomToChoice("conus")} disabled={showing === "conus"}>
                    CONUS
                </button>
            </div>
        </div>
    );
}



export const frontendDate = (date, choice) => {
  if (date === "all-time") return null;

  const year = date.substr(0, 4);
  const monthIndex = parseInt(date.substr(4, 2)) - 1;
  const day = parseInt(date.substr(6, 2));
  
  const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const formalMonths = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  switch (choice) {
    case "short":
      return `${shortMonths[monthIndex]} ${day}, ${year}`;
    case "slash":
      return `${monthIndex + 1}/${day}/${year}`;
    case "formal":
      return `${formalMonths[monthIndex]} ${day}, ${year}`;
    case "dash":
        return `${year}-${date.substr(4, 2)}-${date.substr(6, 2)}`;
    default:
      return null;
  }
}

export const formatExternalLink = (station) => {
    return `https://www.ncei.noaa.gov/access/homr/#qid=GHCND:${station}`;
}