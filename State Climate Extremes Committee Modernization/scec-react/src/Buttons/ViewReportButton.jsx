import React from "react";

export default function ViewReportButton({ note }) {
  const reportPattern = /\/monitoring-content\/extremes\/scec\/reports\//i;
  const anchorTagMatch = note.match(/<a[^>]*href="([^"]*\/monitoring-content\/extremes\/scec\/reports\/[^"]*)"[^>]*>/i);
  const reportURL = anchorTagMatch ? anchorTagMatch[1] : null;

  const shouldShowButton = reportPattern.test(note) && reportURL;

  
}

/**
 * import React, { useEffect, useState } from 'react';

function ReportLink({ note }) {
  const safeNote = typeof note === 'string' ? note : '';
  const [href, setHref] = useState('');
  const [text, setText] = useState(safeNote);

  useEffect(() => {
    const reportMatch = safeNote.match(/href="([^"]*\/monitoring-content\/extremes\/scec\/reports\/[^"]*)"/);
    const isJustViewReport = /^\s*\(?\s*view report\s*\)?\s*$/i.test(safeNote);

    if (reportMatch) {
      setHref(reportMatch[1]);
      setText(isJustViewReport ? '' : safeNote);
    } else {
      setHref('');
      setText(safeNote);
    }
  }, [safeNote]);

  return (
    <div>
      {text && <div id="note">{text}</div>}
      {href && (
        <a
          id="view-report"
          className="btn btn-primary"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Report
        </a>
      )}
    </div>
  );
}

export default ReportLink;
*/