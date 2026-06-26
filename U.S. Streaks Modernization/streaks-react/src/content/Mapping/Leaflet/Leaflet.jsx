import React, { useState, useEffect, useLayoutEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import  { MapController, CornerLogo, Legend, InfoBar, ButtonContainer, frontendDate, formatExternalLink }  from "./components";
import L from "leaflet";
import "./Leaflet.css";
import { useColors, useStreaksStates } from "../../Fetch";

// Utility function to blend two colors
const blendColors = (colorA, colorB, amount) => {
    const [rA, gA, bA] = colorA.match(/\w\w/g).map((c) => parseInt(c, 16));
    const [rB, gB, bB] = colorB.match(/\w\w/g).map((c) => parseInt(c, 16));
    const r = Math.round(rA + (rB - rA) * amount).toString(16).padStart(2, '0');
    const g = Math.round(gA + (gB - gA) * amount).toString(16).padStart(2, '0');
    const b = Math.round(bA + (bB - bA) * amount).toString(16).padStart(2, '0');
    return '#' + r + g + b;
};

// Utility function to get the color based on value and bins
const getColor = (value, valueBins, valueColors) => {
    //Fallback/error catching
    if (!valueBins || !valueColors || valueBins.length === 0) {
        return '#FFFFFF';
    }
    // Check if value exceeds the last bin
    if (value > valueBins[valueBins.length - 1]) {
        return blendColors(valueColors[valueColors.length - 1], '#000000', 0.5);
    }
    // Find the correct bin and return the corresponding color
    for (let ndx = valueBins.length - 1; ndx >= 0; ndx--) {
        if (value >= valueBins[ndx]) {
            return valueColors[ndx];
        }
    }
    return '#FFFFFF';
};

// Utility function to calculate the bins
const calculateBins = (data, maxNumBins) => {
    if (!data || data.length === 0) return [];
    //Set min/max values
    let minValue = data[0].streakLength;
    let maxValue = data[0].streakLength;
    //traverse through the data and find the smallest/largest values
    for (let i = 1; i < data.length; i++) {
        const value = data[i].streakLength;
        if (value < minValue) minValue = value;
        if (value > maxValue) maxValue = value;
    }
    const bins = [minValue]; //create final array
    const interval = Math.ceil((maxValue - minValue) / maxNumBins); //dtermine the interval to increment by
    //From the minimum value, increment up by the increment amount and push() the number you land on to the final array
    let val = minValue;
    while (val < maxValue && bins.length < maxNumBins) {
        val += interval;
        bins.push(parseFloat(val.toFixed(1)));
    }
    return bins;
};

//Main function
function Leaflet({ state, streak, date, mainKey, bigData }) {
    const position = [32.15823, -86.652298];
    const [leafletData, setLeafletData] = useState([]) //grab the information needed to render a correct map
    const colors = useColors(); // Fetch the color palettes
    const [valueBins, setValueBins] = useState([]);
    const [valueColors, setValueColors] = useState([]);
    const [hoveredStation, setHoveredStation] = useState(null); // New state for hover info

    //Zooming logic
    const [mapCenter, setMapCenter] = useState(position);
    const [mapZoom, setMapZoom] = useState(6.3);
    const [mapBounds, setMapBounds] = useState(null); // State for maxBounds

    const streakStates = useStreaksStates();
    
    // This useEffect hook handles the data processing and bin calculation
    useLayoutEffect(() => {
        setLeafletData([]);
        if (bigData) {
            if (colors && colors[streak]) {
                const colorsArray = colors[streak]; //Get the affiliated array from colors.json
                //Slim down either all-time or daily files to the focused state
                const data = state === "CONUS" || state === "US" 
                    ? bigData
                    : bigData.filter(station => station.state === state.toUpperCase())
                ;
                //If a daily option, then filter down to only the selected streaks that occurred on that day, or if all-time, use the sungularly filtered array only
                const slimmerData = date === "all-time" 
                    ? data 
                    : data.filter(station => station.parameter === streak)
                ;

                if (slimmerData.length > 0) {
                    const newBins = calculateBins(slimmerData, colorsArray.length);
                    const newColors = newBins.map((val, ndx) => colorsArray[ndx]);
                    //Logic to correctly give leaflet the data to plot
                    setLeafletData(slimmerData);
                    setValueBins(newBins);
                    setValueColors(newColors);
                } else {
                    setValueBins([]);
                    setValueColors([]);
                    setLeafletData([]);
                }
            }
        }
    }, [bigData]); // Dependencies for the effect (if any of these change, this effect occurs)

    // New useEffect to handle map view changes
    useEffect(() => {
        if (streakStates) { //if us-states.json is fetched
            // validate that the id is number (since this will throw an error if not since wewe do obj[key])
            if (typeof mainKey === "number") {
                const stateData = streakStates[mainKey];
                const { center, bounds, zoom } = stateData;

                // Set the map's center and zoom
                setMapCenter([center.lat, center.lon]);
                setMapZoom(zoom);

                // Use the bounds data directly to create a LatLngBounds object
                const swBound = L.latLng(bounds.ymin, bounds.xmin);
                const neBound = L.latLng(bounds.ymax, bounds.xmax);
                const newBounds = L.latLngBounds(swBound, neBound);
                setMapBounds(newBounds);
            //If it isn't a number, than check if it is the US/CONUS strings
            } else if (typeof mainKey === "string") {
                setMapCenter([39.8283, -98.5795]);
                setMapZoom(4);
            }
        }
    }, [mainKey, streakStates]);

    if (!streakStates) return null;


    //Main Application
    return (
        <div>
            <InfoBar station={hoveredStation} streak={streak} date={date} /> {/** Adding information bar */}
            <CornerLogo src={"https://www.ncei.noaa.gov/monitoring-content/lib/images/noaa-logo.png"} alt={"My Logo"} />{/**Adding Corner logo */}
            <Legend bins={valueBins} colors={valueColors} /> {/** Adding legend bar */}
            
            <MapContainer
                id="map-canvas"
                center={mapCenter} //set initial zoom center
                zoom={mapZoom} //set zoom
                minZoom={mapZoom} // set max zoom-out level
                maxBounds={mapBounds} //determine bounds that the app will set for the state's view
                dragging={state === "US" || state === "CONUS"} // deactivate moving/panning
                scrollWheelZoom={true} // allow mouses (mice?) scroll zoom
                doubleClickZoom={true} // allow phone/laptop double tap zoom
                style={{height: '85vh', width: '100%'}} 
            >
                <MapController zoom={mapZoom} center={mapCenter} /> {/** code for re-zooming on selection switch and locking zoom out */}
                <TileLayer
                    attribution='&copy; via React Leaflet'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                />

                {leafletData.length > 0 && leafletData.map(station => {
                    const markerColor = getColor(station.streakLength, valueBins, valueColors);
                    const customDotIcon = L.divIcon({
                        className: 'custom-dot-icon',
                        html: `<svg width="10" height="10"><circle cx="5" cy="5" r="5" fill="${markerColor}" stroke="#000" stroke-width="0.5"/></svg>`,
                        iconSize: [10, 10],
                        iconAnchor: [5, 5],
                        popupAnchor: [0, -7] //Move Popup above the icon
                    });
                    return (
                        <Marker 
                            key={station.id} 
                            position={[station.lat, station.lng]} 
                            icon={customDotIcon}
                            eventHandlers={{
                                mouseover: () => setHoveredStation(station),
                                mouseout: () => setHoveredStation(null)
                            }}
                        >
                            <Popup>
                                <div className="popup-title"><a href={formatExternalLink(station.id)}>{station.location} ({station.state})</a></div>
                                {/** Streak Length line <div>s */}
                                <div className="popup-data">
                                    <div className="popup-streak">{station.parameter ? `${frontendDate(date, "slash")} Streak: ` : "Record Streak: "}</div>
                                    <div className="popup-value">{station.streakLength} days</div>
                                </div>
                                {/** If applicable,  Record Streak <div> in comaprison to Date Streak */}
                                {station.parameter ? 
                                <div className="popup-data">
                                    <div className="popup-streak">Record Streak: </div>
                                    <div className="popup-value">{station.dayStreak} days</div>
                                </div> : null}
                                <div className="popup-dates">{frontendDate(station.begdate, "short")} - {frontendDate(station.enddate, "short")}</div>
                            </Popup>
                        </Marker>
                    );
                })}
                {/** Button container for when "US" is selected and Alaska and Hawaii become options  */}
                {state.toLowerCase() === 'us' && <ButtonContainer state={state} />} 
            </MapContainer>
        </div>
    );
}


export default React.memo(Leaflet);