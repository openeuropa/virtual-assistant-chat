import React, { useEffect, useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";
import LinkTo from "@storybook/addon-links/react";

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

    const formattedDate = dateObject.toLocaleString("en-GB", options);
    return (
      <>
        <ReactTimeAgo date={dateObject} locale="en-GB" />
        <br />
        <small style={{ whiteSpace: "nowrap" }}>{formattedDate}</small>
      </>
    );
  };

  const allowExpansion = (document) => {
    return document.content !== null;
  };
  const rowExpansionTemplate = (data) => {
    return <div className="p-3">{data.content}dfafdsa</div>;
  };
  const sourceTemplate = (data) => {
    return (
      <a href={data.source_url} target={"_blank"}>
        Visit source
      </a>
    );
  };

  return (
    documents && (
      <>
        <DataTable
          value={documents}
          dataKey="id"
          showGridlines
          size={"small"}
          tableStyle={{ minWidth: "70rem" }}
          expandedRows={expandedRows}
          rowExpansionTemplate={rowExpansionTemplate}
          onRowToggle={(e) => {
            console.log(e);
            setExpandedRows(e.data);
          }}
        >
          <Column expander={allowExpansion} style={{ width: "1rem" }} />
          <Column field="title" header="Title"></Column>
          <Column
            field="rating"
            header="Rating"
            style={{ textAlign: "center" }}
          ></Column>
          <Column
            field="source"
            header="Source"
            style={{ whiteSpace: "nowrap" }}
          ></Column>
          <Column
            field="source_date"
            header="Date"
            body={dateTemplate}
          ></Column>
          <Column
            field="source_url"
            header="Source"
            style={{ whiteSpace: "nowrap" }}
            body={sourceTemplate}
          ></Column>
        </DataTable>
      </>
    )
  );
};
