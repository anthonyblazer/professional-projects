import React from "react";
import "./Modals.css";
import statuses from "../data/statuses.json";
import RecordStatusModal from "./RecordStatusModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RecordsInfoModal() {
  return (
    <>
      {/* Trigger */}
      <h2 id="section-title">
        Records
        <sup>
          <a
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#recordsInfoModal"
            className="ms-2"
            title="More info"
          >
            <FontAwesomeIcon icon={faCircleQuestion} />
          </a>
        </sup>
      </h2>

      {/* Modal */}
      <div
        className="modal fade text-wrap"
        id="recordsInfoModal"
        tabIndex="-1"
        aria-labelledby="recordsTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-xl">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                type="button"
                id="x-close"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div className="modal-title" id="record-status-title">
                SCEC Records
              </div>
            </div>

            <div id="custom-modal-body" className="modal-body">
              <p>
                These values have been evaluated by the NOAA National Centers
                for Environmental Information and/or by the State Climate
                Extremes Committee and determined to be valid. The data may come
                from sources other than official NOAA-supervised weather
                stations, but are archived, officially recognized observations.
                To request a copy of official data, click on the station ID
                hyperlink in the records table. Please note, the station ID
                numbers for some older stations have not yet been included in
                the online metadata system. If a station ID link does not
                associate with that particular station, you may request more
                information from{" "}
                <a href="mailto:ncei.orders@noaa.gov">NCEI.Orders@noaa.gov</a>.
                All values reflect the most current information available (new
                values may take up to three months to appear as final data).
              </p>
              <p>
                Locations without associated station IDs are not archived in
                NCEI's digital data collection. They may be derived from
                historical documents (official or otherwise) in NCEI archives or
                may be archived elsewhere. Please contact NCEI at{" "}
                <a href="mailto:ncei.monitoring.info@noaa.gov">
                  NCEI.Monitoring.Info@noaa.gov
                </a>{" "}
                for more information.
              </p>
              <p>
                Locations without associated station IDs are not archived in
                NCEI's digital data collection. They may be derived from
                historical documents (official or otherwise) in NCEI archives or
                may be archived elsewhere. Please contact NCEI at{" "}
                <a href="mailto:ncei.monitoring.info@noaa.gov">
                  NCEI.Monitoring.Info@noaa.gov
                </a>{" "}
                for more information.
              </p>
            </div>

            <div id="record-status-footer" className="modal-footer">
              <button
                id="primary-rs-btn"
                type="button"
                className="btn me-3"
                data-bs-toggle="modal"
                data-bs-target="#record-status-modal"
                data-bs-dismiss="modal"
              >
                Record Status
              </button>
              <button
                id="close-button"
                type="button"
                className="btn"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <RecordStatusModal listy={statuses} main={true} record={null} />
    </>
  );
}