import React from "react";
import pdfIcon from "@/assets/pdf-icon.svg?raw";

export const Documents = ({ documents }) => {
  const ratingColorMap = {
    A: "nlux-rating-a",
    B: "nlux-rating-b",
    C: "nlux-rating-c",
    D: "nlux-rating-d",
    E: "nlux-rating-e",
    F: "nlux-rating-f",
  };

  const color = (rating) => ratingColorMap[rating] || "nlux-rating-none";

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
            <div className="nlux-doc-icon-container">
              <img src={`data:image/svg+xml;base64,${btoa(pdfIcon)}`} />
            </div>
            <div className="nlux-doc-content-container">
              <h2 className="nlux-doc-title">
                <a href={document.source_url} target={"_blank"}>
                  {document.title}
                </a>
              </h2>
              <p className="nlux-doc-published">
                <b>Published on:</b> {formattedDate}
              </p>
              <p className="nlux-doc-source">
                <b>Source:</b> {document.source}
              </p>
              <div className="nlux-doc-score-container">
                <b>Relevance score:</b>
                <div className={`nlux-doc-badge ${color(document.rating)}`}>
                  <span className={`nlux-doc-grade ${color(document.rating)}`}>
                    {document.rating}
                  </span>
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
