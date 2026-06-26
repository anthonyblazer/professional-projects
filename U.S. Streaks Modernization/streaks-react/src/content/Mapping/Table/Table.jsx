import React, { useEffect, useState, useLayoutEffect } from "react";
import { frontendDate, formatExternalLink } from "../Leaflet/components";
import { useStates } from "../../Fetch";

function Table({ state, streak, date, bigData }) {
    const [tableData, setTableData] = useState([]);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");

    const states = useStates(); // import server states.json
    
    useLayoutEffect(() => {
        if (bigData) {
            // Filter the data based on state selection
            const data = (state === "US") // Is this 'US'? Yes...
                ? bigData // Keep all of the data, or...
                : (state === "CONUS") // No, it's not 'US'. Is it 'CONUS'? Yes...
                    ? bigData.filter(station => station.state !== "HI" && station.state !== "AK") // Filter out HI and AK, or...
                    : bigData.filter(station => station.state === state.toUpperCase()); // Filter for a specific state
            
            // Filter down to the selected daily streaks or use all-time data
            const slimmerData = date === "all-time" 
                ? data 
                : data.filter(station => station.parameter === streak)
            ;
            if (slimmerData.length > 0) {
                // Filter out streaks of length zero and update the table data
                const notableStreaks = slimmerData.filter(station => station.streakLength > 0);
                setTableData(notableStreaks);
            } else {
                // Clear the table data if no notable streaks are found
                setTableData([]);
            }
        }
    }, [bigData]); 


    // This useEffect hook handles the sorting logic whenever the data or sort state changes
    useEffect(() => {
        if (sortColumn && tableData.length > 0) {
            const sortedData = [...tableData].sort((a, b) => {
                let aValue;
                let bValue;
                
                // Special case for the calculated 'difference' column
                if (sortColumn === "difference") {
                    aValue = a.dayStreak - a.streakLength;
                    bValue = b.dayStreak - b.streakLength;
                } else {
                    // Get the values for other columns
                    aValue = a[sortColumn];
                    bValue = b[sortColumn];
                }

                // Handle string and numeric comparisons
                if (typeof aValue === 'string') {
                    return sortDirection === "asc" 
                        ? aValue.localeCompare(bValue) 
                        : bValue.localeCompare(aValue);
                } else {
                    return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
                }
            });
            setTableData(sortedData);
        }
    }, [sortColumn, sortDirection]);

    // Sorting logic for when a column header is pressed
    const sort = (column) => {
        if (sortColumn === column) {
            // If the same column is clicked, reverse the sort direction
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            // If a new column is clicked, set it as the sort column and reset direction to asc
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    if (!states) return null;

    // Render the table if data is available, otherwise show a message
    if (tableData.length > 0) {
        return (
            <div id="dataTable">
                <table id="streaks-data">
                    <thead>
                        <tr>
                            <th className="station sortable unsorted" onClick={() => sort("location")}>Station</th>
                            { state === "CONUS" || state === "US" ? <th className="state sortable unsorted" onClick={() => sort("state")}>State</th> : null }
                            { tableData[0].parameter ? <th className="streak sortable unsorted" onClick={() => sort("streakLength")}>{frontendDate(date, "slash")} Streak</th> : null }
                            <th className="station sortable unsorted" onClick={() => sort("dayStreak")}>Record Streak</th>
                            { tableData[0].parameter ? <th className="difference sortable unsorted" onClick={() => sort("difference")}>Difference</th> : null }
                            <th className="max-dates max-beg-date sortable unsorted" onClick={() => sort("begdate")}>Record<br />Beg Date</th>
                            <th className="max-dates max-beg-date sortable unsorted" onClick={() => sort("enddate")}>Record<br />End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((station) => (
                            <tr key={station.id} className={station.id.substr(0,3)}>
                                <td className={station.id.substr(0,3)}><a href={formatExternalLink(station.id)}>{station.location}</a></td>
                                { state === "CONUS" || state === "US" ? <td className="state">{states[station.state.toLowerCase()]}</td> : null }
                                { station.streakLength ? <td className="max">{station.streakLength}</td> : null }
                                { station.dayStreak ? <td className="max">{station.dayStreak}</td> : null }
                                { station.parameter ? <td className="difference">{station.dayStreak - station.streakLength}</td> : null }
                                <td className="max-dates max-beg-date">{frontendDate(station.begdate, "dash")}</td>
                                <td className="max-dates max-beg-dates">{frontendDate(station.enddate, "dash")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } else {
        return (
            <div id="no-data-message" className="loading">
                No station data found for this selection.
            </div>
        );
    }
}




export default Table;