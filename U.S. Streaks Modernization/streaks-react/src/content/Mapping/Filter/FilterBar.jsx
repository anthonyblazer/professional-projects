import React, { useState, useEffect, useMemo } from 'react';
import { Button } from 'react-bootstrap';
import { useStates, useParameters, useStreaksStates } from '../../Fetch';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./component-styles.css";
import { format, parse } from "date-fns";


// A function to create the lookup map from your data
function createAbbrMap(data) {
    const abbrMap = {}; //create obj
    Object.keys(data).forEach(stateId => { //loop through us-states and make a {"AL": {...}} for future quick lookup
        const state = data[stateId]; // grab the state {}
        abbrMap[state.abbr] = state; //asign the abbr to the {}
    });
    return abbrMap; //return the whole new obj
}

// Accept the current state, streak, and timeframe as props from the parent
function FilterBar({ funct, currentState, currentStreak, currentKey, currentTimeframe }) {
    // Initialize state with default values, not null.
    const [selectedState, setSelectedState] = useState(currentState);
    const [selectedStreak, setSelectedStreak] = useState(currentStreak);
    const [selectedTimeframe, setSelectedTimeframe] = useState(currentTimeframe);
    const [selectedKey, setSelectedKey] = useState(currentKey);
    const [oldDate, setOldDate] = useState(null); // UI functionality - keep the date the last selected Date() in the "On:" when user switches from "On:" to "All-Time"

    const streakStates = useStreaksStates(); // Set states and codes
    const streak_choices = useParameters(); //import server parameters.json (holds streak identity)

    //useMemo(): A new functionality, provided by React - use to run complex computations as needed (once, when
    // dependencies change, etc)
    //Here, creates a obj of state_abbr as keys once and only once on mount 
    const abbrToStateMap = useMemo(() => {
        // Handle the case where streakStates is not yet available
        if (!streakStates) {
            return {};
        }
        return createAbbrMap(streakStates);
    }, [streakStates]); // Dependency on streakStates ensures it reruns when the data is fetched.

    // Set initial values from props once they are available
    useEffect(() => {
        if (currentState) setSelectedState(currentState);
        if (currentStreak) setSelectedStreak(currentStreak);

        // Check if the currentTimeframe is a string and not 'all-time' (so for ex. "20010101")
        if (typeof currentTimeframe === 'string' && currentTimeframe !== 'all-time') {
            // Parse the yyyyMMdd string into a Date object
            const parsedDate = parse(currentTimeframe, 'yyyyMMdd', new Date());
            setSelectedTimeframe(parsedDate);
            setOldDate(parsedDate);
        } else {
            // If it's 'all-time', set it directly
            setSelectedTimeframe(currentTimeframe);
        }

        if (currentKey) setSelectedKey(currentKey);
    }, [currentState, currentStreak, currentTimeframe, currentKey]);

    if (!streak_choices || !streakStates) return null;

    // Check if the user's selections are different from what's currently displayed
    const isDifferent =
        selectedState !== currentState ||
        selectedStreak !== currentStreak ||
        selectedTimeframe !== currentTimeframe;

    // The button is enabled if the selections are valid AND are different from the current display.
    const enablePlot = isDifferent && selectedState && selectedStreak;

    // Helper function to replace/reduce the streak title
    const clean_streak_str = (str) => {
        return str.replace("&deg;F", "°F");
    };

    // Store state choice
    const stateSelect = (event) => {
        const stateAbbr = event.target.value
        setSelectedState(stateAbbr); // set state abbr 

        //Hnadle state ID
        if (abbrToStateMap[stateAbbr]){
            setSelectedKey(abbrToStateMap[stateAbbr].stateId) // store state id for zooming logic
        } else if (stateAbbr === "US"|| stateAbbr === "CONUS") {
            setSelectedKey(stateAbbr);
        }
    };

    // Store streak choice
    const streakSelect = (event) => {
        setSelectedStreak(event.target.value);
    };

    // Set Datepicker choice
    const handleDateChange = (date) => {
        setSelectedTimeframe(date);
    };

    // Set "All Time" choice
    const handleAllTimeClick = () => {
        setSelectedTimeframe("all-time");
    };

    // Main submit handling logic
    const plotData = () => {
        funct("state", selectedState);
        funct("streak", selectedStreak);
        funct("key", selectedKey);
        
        // Pass the formatted date or the 'all-time' string to the parent
        if (selectedTimeframe instanceof Date) {
            funct("timeframe", format(selectedTimeframe, "yyyyMMdd"));
        } else {
            funct("timeframe", selectedTimeframe);
        }
    };

    // Determine the value for the hidden input based on the state
    const backendDate = selectedTimeframe instanceof Date ? format(selectedTimeframe, "yyyyMMdd") : selectedTimeframe;

    return (
        <form id="streak-select" className="marginBottom" onSubmit={(e) => e.preventDefault()}>

            {/** State selection */}
            <span className="nowrap smallMarginRight">
                <label htmlFor="state" className="adaptive">State:{"  "}</label>
                <select id="state" name="state" className="adaptive" onChange={stateSelect}>
                    <option value="US" disabled={selectedTimeframe === "all-time"}>United States</option>
                    <option value="CONUS" disabled={selectedTimeframe === "all-time"}>Contiguous United States</option>
                    {/** Traverse the us-state.json and use the fullname as the selection choice */}
                    {Object.keys(streakStates).map(stateId => {
                        const state = streakStates[stateId];
                        //exclude Puerto Rico and Washington DC
                        if (state.abbr !== "PR" && state.abbr !== "DC") {
                            return (<option key={state.abbr} value={state.abbr}>{state.name}</option>);
                        }
                    })}
                </select>
            </span>

            {/** Streak choices */}
            <span className="nowrap smallMarginRight">
                <label className="adaptive" htmlFor="parameter">Streak:{"  "}</label>
                <select id="parameter" name="parameter" className="adaptive" onChange={streakSelect} value={selectedStreak}>
                    {Object.entries(streak_choices).map(([key, value]) => (
                        <option key={key} value={key}>{clean_streak_str(value.title)}</option>
                    ))}
                </select>
            </span>
            
            {/** All Time time button */}
            <span className="nowrap smallMarginRight">
                <span className="me-2">
                    <input
                        type="radio"
                        id="all-time"
                        className="return-selection"
                        name="return"
                        value="all-time"
                        aria-labelledby="return"
                        checked={selectedTimeframe === "all-time"}
                        onChange={handleAllTimeClick}
                        disabled={selectedState === "US" || selectedState === "CONUS"}
                    />
                    <label className="btn btn-primary return-selection-label" htmlFor="all-time">
                        All Time
                    </label>
                </span>

                {/** On: Button */}
                <span>
                    <input
                        type="radio"
                        id="on-date"
                        className="return-selection"
                        name="return"
                        value="on-date"
                        aria-labelledby="return"
                        //checked={selectedTimeframe !== "all-time"}
                        onChange={() => { 
                            if (selectedTimeframe === "all-time") { 
                                setSelectedTimeframe(oldDate ? oldDate : new Date(2025, 8, 15)); 
                            } 
                        }}
                    />
                    <label className="btn btn-primary return-selection-label" htmlFor="on-date">
                        On:
                        <span id="date-element" style={{ marginLeft: '5px' }}>
                            <DatePicker
                                selected={
                                    selectedTimeframe instanceof Date 
                                    ? selectedTimeframe 
                                    :  oldDate instanceof Date ? oldDate : new Date(2025, 8, 15)
                                }
                                onChange={handleDateChange}
                                dateFormat="MM/dd/yyyy"
                                minDate={new Date(2016, 0, 1)}
                                maxDate={new Date(2025, 8, 15)}
                                className="form-control"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select" // makes them actual <select> elements
                                disabled={selectedTimeframe === "all-time"} // Disable the picker when 'all-time' is selected
                            />
                            <input
                                type="hidden"
                                id="date"
                                name="date"
                                value={backendDate}
                            />
                        </span>
                    </label>
                </span>
            </span>

            <Button id="submit" type="submit" className="btn btn-primary" disabled={!enablePlot} onClick={plotData}>
                Plot
            </Button>
        </form>
    );
}

export default React.memo(FilterBar);