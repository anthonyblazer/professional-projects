import React, { useState } from "react";
import "./App.css";
import records from "./data/records.json"; // Import JSON data
import FilterBar from "./Filter/FilterBar";
import { customFilter } from "./Filter/customFilter";
import RecordsInfoModal from "./Modals/RecordsInfoModal";
import CurrentRecords from "./Records/CurrentRecords";
import CSVButton from "./Buttons/CSVButton";
import XMLButton from "./Buttons/XMLButton";
import JSONButton from "./Buttons/JSONButton";
import "bootstrap/dist/css/bootstrap.min.css";
/**
 * Styling notes
  - add table-striped to the table class to make every other row grey
  - add table hover in order to use BootStraps built in grey background on hover
*/

/**
 * CHECKLIST:
 *  + Fix InnerRecordStatusModal to be used for both Record Status in RecordInfoModal and all state's statuses
 *  + move as much styling as possible to CSS
 *  + Ensure uniformity of using className and id (kind of random rn)
 *  + Discuss with Jesse how to implement Station ID Linking (refer to SCEC site)
 *  + Finish RecordStatusModal
 *
 *  BONUS (if possible)
 *  + Implement a way for any (both old and new) record format to be put into records.json and still work
 *
 *  MUST:
 *  + Format ALL of my site to look as close as possible to the original SCEC site
 *
 * BUGS (list here to go and fix when able):
 *  + On PreviousRecords button push, the table shifts to allow the "Previous Record" to appear
 */

function App() {
  {
    /** PreviousReords usetate vars */
  }
  const [state, setState] = useState("all");
  const [element, setElement] = useState("all");

  {
    /** Function to update state and/or element when user selects a filter */
  }
  const filter = (state, element) => {
    setState(state);
    setElement(element);
  };

  return (
    <div id="main-app-container" className="container">
      <RecordsInfoModal />

      {/** Filter and Download buttons */}
      <h2 id="options-container">
        <h2 id="filter-bar-container">
          <FilterBar state={state} element={element} funct={filter} />
        </h2>
        <div id="button-container">
          <CSVButton data={records} />
          <JSONButton data={records} />
          <XMLButton data={records} />
        </div>
      </h2>

      {/** Table head and main table outline */}
      <table className="table table-bordered">
        <thead id="dark-back">
          <tr>
            <th>State</th>
            <th>Element</th>
            <th>Value</th>
            <th>Date(s)</th>
            <th>Location</th>
            <th>Station ID</th>
            <th>Status</th>
          </tr>
        </thead>

        {/** Main Table generation */}
        <tbody>
          {customFilter(records, state, element).map((record, recordIndex) => (
            <CurrentRecords
              record={record}
              recordIndex={recordIndex}
              key={`${record.state}-${record.element_seq}`}
            />
          ))}
          {/** Generated rows go here */}
        </tbody>
      </table>
    </div>
  );
};

export default App;
