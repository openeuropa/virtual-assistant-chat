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
    <>
      <b>Supporting documents</b>
      <div className="nlux-documents">
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
              key={document.id}
              data-document-id={document.id}
              className="nlux-document"
            >
              <div className="nlux-document-left">
                <small
                  className={`badge badge-sm ${getColorClass(document.rating)}`}
                  style={{ marginRight: "5px" }}
                >
                  {document.rating}
                </small>
              </div>
              <div className="nlux-document-right">
                <a
                  href={document.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {document.title}
                </a>
                <div className="nlux-document-meta">
                  <small style={{ whiteSpace: "nowrap" }}>
                    Published on {formattedDate}
                  </small>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
