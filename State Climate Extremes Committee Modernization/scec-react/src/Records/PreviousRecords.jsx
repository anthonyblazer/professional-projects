import React, { useState } from "react";
import "./Records.css";
import { getUnits, formatDate } from "../Tools";
import "bootstrap/dist/css/bootstrap.min.css";


export default function PreviousRecords({
  record,
  recordIndex,
  expandedRow
}) {
  if (expandedRow !== recordIndex) return null; // Only render if expanded

  const sortedPrevious = [...record.previous].sort((a,b) => b.value - a.value);

  return sortedPrevious.map((prev, prevIndex) => (
    // Previous Records styling
    <tr key={`${recordIndex}-prev-${prevIndex}`} className="table-secondary">
      <td>Previous Record{/** record.state */}</td>
      <td>{/** getElementSeqName(record.element_seq) */}</td>
      <td>
        {prev.value} {getUnits(record.element_seq)}
      </td>
      <td>{formatDate(prev.begdate, prev.enddate)}</td>
      <td>{prev.location}</td>
      <td>{prev.station_id}</td>
      <td>{prev.status}</td>
    </tr>
  ));
}
