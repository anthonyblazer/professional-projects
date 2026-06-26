import React, { useState, useLayoutEffect } from "react";
import MapInfoModal from "./Modals/MapInfoModal";
import FilterBar from "./Filter/FilterBar";
import Table from "./Table/Table";
import { calculateBeginDate } from "../Fetch";

import Leaflet from "./Leaflet/Leaflet";


function Mapping() {

    const [showModal, setShowModal] = useState(false);
    const [state, setState] = useState("al");
    const [streak, setStreak] = useState("500");
    const [timeframe, setTimeframe] = useState("all-time");
    const [key, setKey] = useState(1); //use this to store the state_id key for us-states.json

    //Fetching table information
    const [bigData, setBigData] = useState([]);

    /**
     * Critical functionality!
     * Using a SYNChornous React tool, this useLayoutEffect() fetches information the moment any of the dependencies
     * change to serve the site the correct information immediately on "Plot" since React-Leaflet serves the application
     * immediately. Additionally, useLayoutEffect() removes any loading "ticks" by default (contrary to useEffect())
     *  - useEffect() is ASYNC, so it does not allow the data to be ready when React_Leaflet loads, thus leading to 
     *    incorrect data being plotted.
     */
    
    useLayoutEffect(() => { 
        setBigData([]);
        // Construct the URL dynamically inside the effect
        const directory = timeframe === "all-time" ? "all-time" : "daily";
        const file_name = timeframe === "all-time" ? `${streak}-us-station-extreme.txt` : `streaks-${timeframe}.txt`;
        const data_url = `https://www.ncei.noaa.gov/monitoring-content/extremes/streaks/data/${directory}/${file_name}`;

        fetch(data_url) //Fetch the faily/all-time information
            .then(res => res.text())
            .then(text => {
                const parsed = text
                    .split("\n")
                    .filter(line => line.trim() !== "")
                    .map(line => {
                        const parts = line.trim().split(/\s+/);

                        if (data_url.includes("all-time")) {
                            return {
                                id: parts[0],
                                state: parts[1],
                                lat: parseFloat(parts[2]),
                                lng: parseFloat(parts[3]),
                                streakLength: parseInt(parts[4], 10),
                                enddate: parts[5],
                                begdate: calculateBeginDate(parts[5], parseInt(parts[4], 10)),
                                location: parts.slice(6).join(" ")
                            }
                        } else if (data_url.includes("daily")) {
                            return {
                                parameter: parts[0],
                                state: parts[1],
                                id: parts[2],
                                lat: parseFloat(parts[3]),
                                lng: parseFloat(parts[4]),
                                streakLength: parseInt(parts[5], 10),
                                dayStreak: parseInt(parts[6], 10),
                                enddate: parts[7],
                                begdate: calculateBeginDate(parts[7], parseInt(parts[6], 10)),
                                location: parts.slice(8).join(" ")
                            }
                        } else {
                            console.warn("Unexpected data length:", parts.length, "in line:", line);
                            return null;
                        }
                    });
                setBigData(parsed);
            })
            .catch(err => console.error("Error loading station data:", err));
    }, [state, streak, timeframe]); // DEPENDENCIES ARE THE KEY

    const handleSelection = (abbr, value) => {
        //Determine which useState to change based on its passed in abbr
        if (abbr === "state") setState(value);
        if (abbr === "streak") setStreak(value);
        if (abbr === "timeframe") setTimeframe(value);
        if (abbr === "key") setKey(value);
    }

    //Create a button for the modal
    const mapBtn = <a 
        aria-label="Mapping Note"
        onClick={() => setShowModal(true)}>
            <i className="far fa-question-circle"></i>
    </a>
    
    return (
        <div id="monitoring-content">

            <h2 id="section-title">Mapping</h2>
            <p>
                Use the form below to generate a map and data table of either streaks on a given day or 
                all time longest streaks. {mapBtn}
            </p>

            {/** Main filter bar */}
            <FilterBar
                funct={handleSelection}
                currentState={state}
                currentStreak={streak}
                currentTimeframe={timeframe}
                currentKey={key}
            />

            {/** Mapping note modal component */}
            <MapInfoModal 
                show={showModal} 
                onHide={() => setShowModal(false)} 
            />

            {/** Leaflet Application */}
            <div id="dynamicContent" >
                <div id="map-canvas-div">
                   <Leaflet 
                    state={state} 
                    streak={streak} 
                    date={timeframe} 
                    mainKey={key}
                    bigData={bigData} 
                />
                </div>

                {/** Download/Map options bar  */}
                <div id="mapOptionsDiv" className="marginTop marginBottom">
                    ...download options stuff here
                </div>

                {/** Dynamic Table */}
                <div id="dataTableDiv">
                    <Table state={state} streak={streak} date={timeframe} bigData={bigData}/>
                </div>
            </div>
        </div>
    )
}


export default React.memo(Mapping);