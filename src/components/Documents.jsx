import React, { useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export const Documents = ({ documents }) => {
  const [expandedRows, setExpandedRows] = useState(null);

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
          tableStyle={{ minWidth: "50rem" }}
          rowExpansionTemplate={rowExpansionTemplate}
          onRowToggle={(e) => setExpandedRows(e)}
        >
          <Column expander={true} style={{ width: "5rem" }} />
          <Column field="title" header="Title"></Column>
          <Column field="content" header="Content"></Column>
          <Column field="rating" header="Rating"></Column>
          <Column field="source_date" header="Date"></Column>
        </DataTable>
      </>
    )
  );
};
