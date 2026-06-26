import React from "react";
import "./Modals.css";
import { getElementSeqName, getState } from "../Tools";

export default function RecordStatusModal({
  listy,
  main,
  record,
  recordIndex,
  placeHolder,
}) {
  let title = <p>Record Status</p>;
  let trigger = null;
  let modalId = "record-status-modal";

  if (!main && record) {

    title = (
      <>
        <p>
          {getState(record.state)}
          <br />
          {getElementSeqName(record.element_seq)}
          <br />
          Record Status
        </p>
      </>
    );
    modalId = `statusModal-${recordIndex}`;

    trigger = (
      <a
        id="record-status-linked"
        href="#"
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
        className="ms-2"
        title="Record Status info"
      >
        {placeHolder}
      </a>
    );
  }

  return (
    <>
      {trigger}

      <div
        className="modal fade border-0"
        id={modalId}
        tabIndex="-1"
        aria-labelledby="recordStatusTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-md">
          <div class="modal-content">
            <div className="modal-header border-0">
              <button
                type="button"
                id="x-close"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div className="modal-title" id="record-status-title">
                {title}
              </div>
            </div>

            <div id="record-status-display" class="modal-body text-left">
              <ul id="record-statuses">
                {Object.entries(listy).map(([key, value]) => (
                  <li>
                    <strong>{key}</strong>
                    {value}
                  </li>
                ))}
              </ul>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}