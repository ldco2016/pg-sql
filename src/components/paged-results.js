import React from "react";
import Table from "./table";

export default ({ results }) => {
  if (!results.length) {
    return null;
  }
  const [result] = results;

  if (!result.queryResults) {
    return null;
  }
  const [firstResult] = result.queryResults;

  if (!firstResult) {
    return null;
  }

  return (
    <div style={{ overflow: "auto", maxHeight: "100%", width: "100%" }}>
      <Table queryResult={firstResult} />
    </div>
  );
};
