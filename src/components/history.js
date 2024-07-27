import "./history.css";
import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { Table, Button } from "reactstrap";

export default ({ results, runQuery }) => {
  const renderedResults = results.slice(0, 10).map((result, index) => {
    return (
      <tr key={index}>
        <td>
          <Button onClick={() => runQuery(result.query)}>
            <i className="fas fa-play"></i>
          </Button>
        </td>
        <td>
          <CodeMirror
            value={result.query}
            options={{
              mode: "sql",
              theme: "material",
              lineNumbers: false,
              tabMode: "indent",
            }}
          />
          <div>{result.error}</div>
        </td>
      </tr>
    );
  });

  return (
    <div className="history table-responsive">
      <h4>Query History</h4>
      <Table className="table-nowrap table-centered">
        <thead>
          <tr>
            <th>Rerun</th>
            <th>Query</th>
          </tr>
        </thead>
        <tbody>{renderedResults}</tbody>
      </Table>
    </div>
  );
};
