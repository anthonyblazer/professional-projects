import React from "react";
import "./Modals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import {
  getUnits,
  formatDate,
  getNote,
  getStatuses,
  formatStationId,
  getElementSeqName,
  getState,
} from "../Tools";
import ViewReportButton from "../Buttons/ViewReportButton";
import StationInfoButton from "../Buttons/StationInfoButton";
import "bootstrap/dist/css/bootstrap.min.css";


export default function RecordInfoModal({
  record,
  curr,
  state,
  element,
  recordIndex,
  vary,
}) {
  const modalId = `infoModal-${recordIndex}`;
  const alt_id = Math.floor(Math.random() * (500 - 0 + 1)) + 0;

  if (curr.note_seq !== "") {
    return (
      <>
        {/* Trigger */}
        <a
          href="#"
          data-bs-toggle="modal"
          data-bs-target={`#${modalId}`}
          className="ms-2"
          title="Record info"
        >
          <FontAwesomeIcon icon={faCircleInfo} />
        </a>

        {/* Modal */}
        <div
          className="modal fade text-wrap"
          id={modalId}
          tabIndex="-1"
          aria-labelledby="recordInfo"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable modal-md">
            <div className="modal-content">
              <div className="modal-header border-0">
                <div className="modal-title" id="record-status-title">
                  <h3>{state}</h3>
                  <h4>{element}</h4>
                </div>
                <button
                  type="button"
                  id="x-close"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body px-4">
                <div
                id="adjustment"
                  className="mb-4"
                  style={{ fontSize: "1.2rem", lineHeight: "1.7" }}
                >
                  <p >
                    <strong>Value:</strong> {curr.value}{" "}
                    {getUnits(record.element_seq)}
                  </p>
                  <p >
                    <strong>Dates:</strong>{" "}
                    {formatDate(curr.begdate, curr.enddate)}
                  </p>
                  <p >
                    <strong>Location:</strong> {curr.location}
                  </p>
                  <p >
                    <strong>Station ID:</strong>{" "}
                    {formatStationId(record.state, curr.station_id)}
                  </p>
                  <p >
                    <strong>Status:</strong>{" "}
                    {/** Implement record status with modal */}
                  </p>
                </div>

                <p style={{ fontSize: "1.2rem", lineHeight: "1.7" }}>
                  {getNote(curr.note_seq)}
                </p>
              </div>

              <div id="record-status-footer" class="modal-footer">
                <button
                  type="button"
                  className="btn"
                  id="close-button"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                {/** Implement View Report Button Component */}
                <StationInfoButton />
                {/** Implement Station ID Button Compoenent  */}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}