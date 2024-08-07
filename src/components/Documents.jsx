import React from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";
import Table from "rc-table";

export const Documents = ({ documents }) => {
  TimeAgo.addDefaultLocale(en);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: 150,
    },
    {
      title: "Publication date",
      key: "source_date",
      render: (row) => {
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
          <div>
            <ReactTimeAgo date={dateObject} locale="en-GB" />
            <br />
            <small style={{ whiteSpace: "nowrap" }}>{formattedDate}</small>
          </div>
        );
      },
    },
    {
      title: "Source",
      key: "source",
      render: (row) => (
        <a href={row.source_url} target={"_blank"}>
          Visit source
        </a>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      rowKey={"id"}
      data={documents}
      expandable={{
        expandRowByClick: true,
        expandedRowRender: (row) => <p>extra: {row.content}</p>,
      }}
    />
  );
};
