import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";

export const Documents = ({ documents }) => {
  TimeAgo.addDefaultLocale(en);

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Rating",
      selector: (row) => row.rating,
    },
    {
      name: "date",
      selector: (row) => row.source_date,
      cell: (row) => {
        const dateObject = new Date(row.source_date);
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
      },
    },
    {
      name: "Source",
      selector: (row) => row.source,
      cell: (row) => (
        <a href={row.source_url} target={"_blank"}>
          Visit source
        </a>
      ),
    },
  ];

  return <DataTable theme="light" columns={columns} data={documents} />;
};
