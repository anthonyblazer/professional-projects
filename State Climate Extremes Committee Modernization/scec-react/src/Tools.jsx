import React from "react";
import "./App.css";
import elements from "./data/elements.json";
import notes from "./data/notes.json";
import statuses from "./data/statuses.json";

/**
 * Tools.jsx: Contains function to ease the relational model traversal needed
 * for formatting in the main App
 */

/**
 * Used to get the short (display) Element Name of the current record
 */
export function getElementSeqName(elementSeq) {
  return elements[elementSeq].shortName;
}

/**
 * Used to get the record's value unit for correct formatting
 */
export function getUnits(elementSeq) {
  const unit = elements[elementSeq].units;
  if (unit === "&deg;F") {
    return "°F";
  }
  return unit;
}

/**
 * Used to get the note associated with the record(s)
 */
export function getNote(noteSeq) {
  return notes[noteSeq] || "";
}

/**
 * Used to format the begdate and enddate for desired formatting
 */
export function formatDate(begdate, enddate) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]; // getDate() returns a zero-based index rep. of the month, so use that index to find the month's long name
  const startDate = new Date(begdate);
  const endDate = new Date(enddate);

  //Date templates
  const sameMonth = `
    ${months[startDate.getMonth()]}
   ${startDate.getDate()} - ${endDate.getDate()}, ${startDate.getFullYear()}`; //Change if needed, current syntax: MM DD-DD YYYY

  const sameYear = `${months[startDate.getMonth()]} ${startDate.getDate()} - ${
    months[endDate.getMonth()]
  } ${endDate.getDate()}, ${startDate.getFullYear()}`; //Change if needed, current syntax: MM DD - MM DD YYYY

  const differentYear = `${
    months[startDate.getMonth()]
  } ${startDate.getDate()}, ${startDate.getFullYear()} -  ${
    months[endDate.getMonth()]
  } ${endDate.getDate()}, ${endDate.getFullYear()}`; //Change if needed, current syntax: MM DD YYYY - MM DD YYYY

  //If same date overall
  if (begdate == enddate) {
    return `${begdate}`;
  }
  //If same year
  else if (startDate.getFullYear() == endDate.getFullYear()) {
    //If same month
    if (startDate.getMonth() == endDate.getMonth()) {
      return sameMonth;
    }
    return sameYear;
  }
  //if different years
  return differentYear;
}

/**
 * Helper method to correctly format the abbreviation in records.json state key into
 * the full state name
 */
export function getState(abr) {
  const states = {
    AL: "Alabama",
    AK: "Alaska",
    AZ: "Arizona",
    AR: "Arkansas",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DE: "Delaware",
    FL: "Florida",
    GA: "Georgia",
    HI: "Hawaii",
    ID: "Idaho",
    IL: "Illinois",
    IN: "Indiana",
    IA: "Iowa",
    KS: "Kansas",
    KY: "Kentucky",
    LA: "Louisiana",
    ME: "Maine",
    MD: "Maryland",
    MA: "Massachusetts",
    MI: "Michigan",
    MN: "Minnesota",
    MS: "Mississippi",
    MO: "Missouri",
    MT: "Montana",
    NE: "Nebraska",
    NV: "Nevada",
    NH: "New Hampshire",
    NJ: "New Jersey",
    NM: "New Mexico",
    NY: "New York",
    NC: "North Carolina",
    ND: "North Dakota",
    OH: "Ohio",
    OK: "Oklahoma",
    OR: "Oregon",
    PA: "Pennsylvania",
    PR: "Puerto Rico",
    RI: "Rhode Island",
    SC: "South Carolina",
    SD: "South Dakota",
    TN: "Tennessee",
    TX: "Texas",
    UT: "Utah",
    VT: "Vermont",
    VA: "Virginia",
    VI: "Virgin Islands (U.S.)",
    WA: "Washington",
    WV: "West Virginia",
    WI: "Wisconsin",
    WY: "Wyoming",
  };

  return states[abr];
}

/**
 * Breaks the single string status value into an object of codes from statuses.json in order
 * to oorrectly use and format the statuses in the site's modals and status column
 */
export function getStatuses(statusStr) {
  const statusCodes = statusStr.split("");
  let finalObj = {};
  statusCodes.forEach((element) => {
    let letter = element;
    let description = statuses[letter];
    finalObj[letter] = description;
  });
  return finalObj;
}

/**
 * Creates a text representation of the station_id that redirects users to the station's
 * info (if it exists)
 */
export function formatStationId(stateAbbr, stationId) {
  const prefix = stateAbbr === "pr" ? "RQ" : stateAbbr === "vi" ? "VQ" : "US";
  let homrId = "";

  if ([455668, 308406, 207834].includes(stationId)) {
    homrId = `COOP:${stationId}`;
  } else if (/^\d{5}$/.test(stationId)) {
    homrId = `GHCND:${prefix}W000${stationId}`;
  } else if (/^\d{6}$/.test(stationId)) {
    homrId = `GHCND:${prefix}C00${stationId}`;
  }

  if (!stationId) return "N/A";

  if (homrId && ![110291, 287620].includes(stationId)) {
    const homrUrl = `https://www.ncei.noaa.gov/homr/#qid=${homrId}&tab=LOCATIONS`;
    return (
      <a
        id="station-id"
        href={homrUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="View Station Information"
      >
        {stationId}
      </a>
    );
  }

  return stationId;
}
