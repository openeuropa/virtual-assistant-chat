import React from "react";
import ReactTimeAgo from "react-time-ago";

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
      <div className="cs-documents-list">
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
            <div key={document.id} className="cs-document-item">
              <b>
                <a
                  href={document.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <small
                    className={`badge badge-sm ${getColorClass(document.rating)}`}
                    style={{ marginRight: "5px" }}
                  >
                    {document.rating}
                  </small>
                  {document.title}
                </a>
              </b>
              <div className="cs-documents-meta">
                <small style={{ whiteSpace: "nowrap" }}>
                  Published <ReactTimeAgo date={dateObject} locale="en-GB" /> on{" "}
                  {formattedDate}
                </small>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
