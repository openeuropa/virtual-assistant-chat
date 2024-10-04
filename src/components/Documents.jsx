import React from "react";

export const Documents = ({ documents }) => {
  const ratingColorMap = {
    A: "bg-success",
    B: "bg-warning",
    C: "bg-danger",
    D: "bg-danger",
    F: "bg-danger",
  };

  const getColorClass = (rating) => {
    return ratingColorMap[rating] || "bg-secondary";
  };

  return (
    <div className="nlux-documents">
      <b>Supporting documents</b>
      {documents.map((document) => {
        const dateObject = new Date(document.source_date);
        let options = {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        };
        const formattedDate = dateObject.toLocaleString("en-GB", options);

        return (
          <div
            className="nlux-doc-document-card"
            key={document.id}
            data-document-id={document.id}
          >
            <div className="nlux-doc-icon-container"></div>
            <div className="nlux-doc-content-container">
              <h2>{document.title}</h2>
              <p className="nlux-doc-published">
                <b>Published on:</b> {formattedDate}
              </p>
              <p className="nlux-doc-source">
                <b>Source:</b> {document.source}
              </p>
              <div className="nlux-doc-score-container">
                <div className="nlux-doc-score-badge">
                  <span className="nlux-doc-grade">{document.rating}</span>
                  <span className="nlux-doc-score">
                    {parseFloat(document.score.toFixed(3))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
