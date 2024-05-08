import "./table.css";
import React from "react";
import { Table } from "reactstrap";

export default ({ queryResult: { rows, fields, command, rowCount } }) => {
  const headers = fields.map(({ name }, index) => {
    return <th key={name + index}>{name}</th>;
  });

  const renderedRows = rows.map((row, index) => {
    const tds = fields.map(({ name }, index) => {
      let val = row[name];

      if (typeof val === "object") {
        val = JSON.stringify(val);
      } else if (typeof val === "boolean") {
        val = val.toString();
      }

      return <td key={name + index}>{val}</td>;
    });

    return <tr key={index}>{tds}</tr>;
  });

  return (
    <div className="results-table table-responsive">
      <Table className="table table-hover table-dark mb-0 table-striped">
        <thead>
          <tr>{headers}</tr>
          <tbody>{renderedRows}</tbody>
        </thead>
      </Table>
    </div>
  );
};
