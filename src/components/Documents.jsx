import React, { useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";

export const Documents = ({ documents }) => {
  TimeAgo.addDefaultLocale(en);

  const [expandedRows, setExpandedRows] = useState(null);

  const dateTemplate = (document) => {
    const dateObject = new Date(document.source_date);
    let options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    let formattedDate = dateObject.toLocaleString("en-GB", options);
    return (
      <div>
        <ReactTimeAgo date={dateObject} locale="en-GB" /> <br />{" "}
        <small style={{ whiteSpace: "nowrap" }}>{formattedDate}</small>
      </div>
    );
  };

  const rowExpansionTemplate = (data) => {
    return <div className="p-3">{data.content}</div>;
  };

  return (
    documents && (
      <>
        <DataTable
          value={documents}
          dataKey={"id"}
          showGridlines
          size={"small"}
          tableStyle={{ minWidth: "70rem" }}
          rowExpansionTemplate={rowExpansionTemplate}
          onRowToggle={(e) => setExpandedRows(e.data)}
        >
          <Column expander={true} style={{ width: "1rem" }} />
          <Column field="title" header="Title"></Column>
          <Column
            field="source"
            header="Source"
            style={{ whiteSpace: "nowrap" }}
          ></Column>
          <Column field="rating" header="Rating"></Column>
          <Column
            field="source_date"
            header="Date"
            body={dateTemplate}
          ></Column>
        </DataTable>
      </>
    )
  );
};
