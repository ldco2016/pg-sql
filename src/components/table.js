import "./table.css";
import React from "react";
import { Table } from "reactstrap";

export default ({ queryResult: { rows, fields, command, rowCount } }) => {
  if (
    ["CALL", "INSERT", "CREATE", "DROP", "UPDATE", "DELETE"].includes(command)
  ) {
    return (
      <div className="results-table table-responsive">
        <h3>{command} successful!</h3>
        {command === "UPDATE" ? `${rowCount} row(s) updated` : ""}
        {command === "DELETE" ? `${rowCount} row(s) deleted` : ""}
        {command === "INSERT" ? `${rowCount} row(s) inserted` : ""}
        {command === "CREATE" ? `CREATE complete` : ""}
        {command === "DROP" ? `DROP complete` : ""}
      </div>
    );
  }

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
