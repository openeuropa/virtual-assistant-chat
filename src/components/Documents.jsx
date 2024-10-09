import React, { useState } from "react";
import { Document } from "@/components/Document.jsx";
import docsIcon from "@/assets/docs-icon.svg?raw";

export const Documents = ({ documents, expanded = false }) => {
  const [toggle, setToggle] = useState(expanded);

  return (
    <div className="nlux-documents">
      <button
        className="nlux-documents-toggle"
        onClick={() => setToggle(!toggle)}
      >
        <img
          className="nlux-documents-icon"
          src={`data:image/svg+xml;base64,${btoa(docsIcon)}`}
        />
        <div>
          <b>{documents.length}</b> supporting documents
        </div>
        <div
          className={`nlux-doc-toggle nlux-doc-toggle-small${toggle ? " nlux-doc-toggle-active" : ""}`}
        ></div>
      </button>

      {toggle && (
        <>
          {documents.map((document) => (
            <Document key={document.id} document={document} />
          ))}
        </>
      )}
    </div>
  );
};
