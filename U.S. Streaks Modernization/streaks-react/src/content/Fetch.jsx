import React, { useEffect, useState } from "react";


export function useSections() {

    const [sections, setSections] = useState(null);

    useEffect(() => {
        fetch("https://www.ncei.noaa.gov/monitoring-content/extremes/streaks/metadata/sections.json")
        .then((res) => res.json())
        .then((json) => setSections(json))
        .catch((error) => console.error("Failed to fetch sections: ", error))
    }, [])

    return sections;
    
}



export function useParameters() {

    const [ parameters, setParameters ] = useState(null);

    useEffect(() => {
        fetch("https://www.ncei.noaa.gov/monitoring-content/extremes/streaks/metadata/parameters.json")
        .then((res) => res.json())
        .then((json) => setParameters(json))
        .catch((error) => console.error("failed to fetch parameters: ", error))
    }, [])

    return parameters;

}



export function useStates() {

    const [states, setStates] = useState(null);

    useEffect(() => {
        fetch("https://www.ncei.noaa.gov/monitoring-content/extremes/scec/metadata/states.json")
        .then((res) => res.json())
        .then((json) => setStates(json))
        .catch((error) => console.error("Failed to fetch states.json: ", error))
    },[])

    return states;
}

export function useStreaksStates() {

    const [states, setStates] = useState(null);

    useEffect(() => {
        fetch("https://www.ncei.noaa.gov/monitoring-content/lib/locations/us-states.json")
        .then((res) => res.json())
        .then((json) => setStates(json))
        .catch((error) => console.error("Failed to fetch states.json: ", error))
    }, [])

    return states;
}


export function useColors() {

    const [colors, setColors] = useState(null);

    useEffect(() => {
        fetch("https://www.ncei.noaa.gov/monitoring-content/extremes/streaks/metadata/colors.json")
        .then((res) => res.json())
        .then((json) => setColors(json))
        .catch((error) => console.error("Failed to fetch colors.json: ", error))
    }, [])

    return colors;
}



/**
 * Helper function to calculate the begin date by subtracting the streak length from an end date.
 * @param {string} endDateStr - The end date in 'YYYYMMDD' format (e.g., "20231026").
 * @param {number} streakLength - The number of days to subtract.
 */
export function calculateBeginDate(endDateStr, streakLength) {
  try {
    // Extract year, month, and day from the string
    const year = parseInt(endDateStr.substring(0, 4), 10);
    const month = parseInt(endDateStr.substring(4, 6), 10);
    const day = parseInt(endDateStr.substring(6, 8), 10);

    // Create a new Date object. Note: JavaScript months are 0-indexed
    // so we subtract 1 from the parsed month.
    const endDate = new Date(year, month - 1, day);

    // Subtract the days. The setDate method automatically handles rolling over to previous months and years correctly.
    endDate.setDate(endDate.getDate() - streakLength + 1); 
    //Add +1 since the length is inclusive of the day it ended (so ex: 36 day continually + the day it stopped)

    // Format the new date back into YYYYMMDD string format
    const newYear = endDate.getFullYear();
    const newMonth = (endDate.getMonth() + 1).toString().padStart(2, '0'); // Add 1 back to month
    const newDay = endDate.getDate().toString().padStart(2, '0');

    return `${newYear}${newMonth}${newDay}`;
    
  } catch (error) {
    console.error("Error calculating begin date:", error);
    return "Invalid Date Format";
  }
}