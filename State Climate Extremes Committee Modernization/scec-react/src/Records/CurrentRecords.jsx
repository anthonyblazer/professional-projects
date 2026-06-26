import React, { useState } from "react";
import {
  getElementSeqName,
  getUnits,
  formatDate,
  getState,
  getStatuses,
  formatStationId,
} from "../Tools";
import "./Records.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardStep } from "@fortawesome/free-solid-svg-icons";
import PreviousRecords from "./PreviousRecords";
import RecordInfoModal from "../Modals/RecordInfoModal";
import RecordStatusModal from "../Modals/RecordStatusModal";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CurrentRecords({ record, recordIndex }) {
  const [expandedRow, setExpandedRow] = useState(null);
  const currentRecords = record.current;

  return currentRecords.map((currentRecord, currentIndex) => {
    {
      /**Put any instance vars here (outside main table return) */
    }

    return (
      <React.Fragment key={`${record.state}-${recordIndex}-${currentIndex}`}>
        <tr>
          {/* Only show state on first row of tie group */}
          {currentIndex === 0 && (
            <td rowSpan={currentRecords.length}>{getState(record.state)}</td>
          )}

          {/* Only show element on first row of tie group */}
          {currentIndex === 0 && (
            <td rowSpan={currentRecords.length}>
              {getElementSeqName(record.element_seq)}{" "}
              <RecordInfoModal
                record={record}
                curr={currentRecord}
                element={getElementSeqName(record.element_seq)}
                state={getState(record.state)}
                recordIndex={recordIndex}
              />
            </td>
          )}

          {/* Only show value on first row of tie group */}
          {currentIndex === 0 && (
            <td rowSpan={currentRecords.length}>
              {currentRecord.value} {getUnits(record.element_seq)}
              {generateButton(record, recordIndex, setExpandedRow, expandedRow)}
            </td>
          )}

          <td>{formatDate(currentRecord.begdate, currentRecord.enddate)}</td>
          <td>{currentRecord.location}</td>
          <td>{formatStationId(record.state, currentRecord.station_id)}</td>
          <td>
              <RecordStatusModal
                listy={getStatuses(currentRecord.status)}
                main={false}
                record={record}
                recordIndex={recordIndex}
                placeHolder={currentRecord.status}
              />
          </td>
        </tr>
        <PreviousRecords
          record={record}
          recordIndex={recordIndex}
          expandedRow={expandedRow}
          setExpandedRow={setExpandedRow}
          key={`${currentRecord.state}-${currentIndex}`}
        />
      </React.Fragment>
    );
  });
}

/**
 * Helper Function but is one of the most important functions. This function handles the
 * toggled off/on logic for the appearance of previous records
 *
 * index: the index of record that is being listened to
 * funct: makes the change of the useState()
 * expandedRow: variables to change from off to on
 */
function togglePrevious(index, funct, expandedRow) {
  funct(expandedRow == index ? null : index);
}

/**
 * Follow up function to above. By passing a record and the same required 3 parameters
 * from togglePrevious(), this function determines whether the current record has VALID
 * previous records to display. If so, then a button to view them is added in place of the
 * function call
 */
function generateButton(record, recordIndex, setExpandedRow, expandedRow) {
  const theButton = (
    <button
      onClick={() => togglePrevious(recordIndex, setExpandedRow, expandedRow)}
      className="fa-circ-custom"
      title="View Previous Records"
    >
      <FontAwesomeIcon icon={faBackwardStep} className="backward-icon" />
    </button>
  );

  //if previous records exist AND if it isn't empty
  if (record.previous && record.previous.length > 0) {
    return theButton;
  }
}