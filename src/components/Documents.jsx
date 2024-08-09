import IconChevronRight from "bootstrap-icons/icons/chevron-right.svg";
import IconChevronDown from "bootstrap-icons/icons/chevron-down.svg";
import React, { memo } from "react";
import ReactTimeAgo from "react-time-ago";
import Table from "rc-table";

export const Documents = ({ documents }) => {
  const columns = [
    {
      title: "Documents",
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
            <div className="cs-documents-meta">
              <small
                className={`badge badge-sm ${getColorClass(row.rating)}`}
                style={{ marginRight: "5px" }}
              >
                Rating {row.rating}
              </small>

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

  return <MemoizedTable columns={columns} documents={documents} />;
};

const MemoizedTable = memo(function MemoizedTable({ columns, documents }) {
  return (
    <Table
      columns={columns}
      rowKey={"id"}
      data={documents}
      prefixCls={"cs-documents"}
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
}, compareDocumentArrays);

/**
 * Function to compare two documents based on specified properties.
 *
 * @param arr1
 * @param arr2
 * @returns {boolean}
 */
function compareDocumentArrays(arr1, arr2) {
  function compareDocuments(doc1, doc2) {
    return (
      doc1.source_date === doc2.source_date &&
      doc1.rating === doc2.rating &&
      doc1.title === doc2.title &&
      doc1.id === doc2.id
    );
  }

  // First, check if both arrays have the same length
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Compare each document
  for (let i = 0; i < arr1.length; i++) {
    const doc1 = arr1[i];
    const doc2 = arr2[i];

    if (!compareDocuments(doc1, doc2)) {
      return false;
    }
  }

  return true;
}
