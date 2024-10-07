import React from "react";
import { Document } from "@/components/Document.jsx";

export const Documents = ({ documents }) => {
  return (
    <div className="nlux-documents">
      <b>Supporting documents</b>
      {documents.map((document) => (
        <Document key={document.id} document={document} />
      ))}
    </div>
  );
};
