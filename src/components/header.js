/* eslint no-restricted-globals: 0 */
import "./header.css";
import React from "react";
import CommandButton from "./command-button";
import { format } from "sql-formatter";
import SchemaBrowser from "./schema-browser";
import api from "../api";
import Icon from "./icon";

export default ({ loading, runQuery, value, setValue }) => {
  const onResetClick = async () => {
    if (
      !confirm(
        "Are you sure you want to reset the database? This will remove all data you have added."
      )
    ) {
      return;
    }

    await api.resetInstance();
  };

  return (
    <div className="header">
      <CommandButton
        disabled={loading}
        color="primary"
        size="lg"
        onClick={() => runQuery(value)}
      >
        <Icon name="play" />
        Run
      </CommandButton>
      <CommandButton
        color="primary"
        size="lg"
        onClick={() => setValue(format(value))}
      >
        <Icon name="align-left" />
        Format
      </CommandButton>
      <SchemaBrowser />
      <CommandButton color="primary" size="lg" onClick={onResetClick}>
        <Icon name="undo" />
        Reset Db
      </CommandButton>
    </div>
  );
};
