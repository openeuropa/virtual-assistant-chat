import IconChevronRight from "bootstrap-icons/icons/chevron-right.svg";
import IconChevronDown from "bootstrap-icons/icons/chevron-down.svg";
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
      key: "title",
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
            <div className="text-muted">
              <span
                className={`badge ${getColorClass(row.rating)}`}
                style={{ marginRight: "5px" }}
              >
                Rating {row.rating}
              </span>

              <small style={{ whiteSpace: "nowrap" }}>
                Published <ReactTimeAgo date={dateObject} locale="en-GB" /> on{" "}
                {formattedDate}
              </small>
            </div>
            <b>
              <a href={row.source_url} target={"_blank"}>
                {row.title}
              </a>
            </b>
          </>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      rowKey={"id"}
      data={documents}
      className={"table"}
      expandable={{
        expandedRowRender: (row) => <p>{row.content}</p>,
        expandIcon: (props) => {
          return (
            <a
              onClick={(e) => props.onExpand(props.record, e)}
              style={{ cursor: "pointer", paddingLeft: 5, paddingRight: 5 }}
            >
              <img src={!props.expanded ? IconChevronRight : IconChevronDown} />
            </a>
          );
        },
      }}
    />
  );
};
