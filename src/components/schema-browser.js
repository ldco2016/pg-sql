import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import CommandButton from "./command-button";
import Icon from "./icon";
import api from "../api";
import PagedResults from "./paged-results";

const schemaQuery = `
SELECT 
        tablename, column_name, data_type, character_maximum_length 
FROM 
        pg_catalog.pg_tables 
JOIN INFOMRATION_SCHEMA.COLUMNS as columns on columns.table_name = tablename
WHERE
    schemaname != 'pg_catalog'
AND 
    schemaname != 'information_schema'
ORDER BY 
    tablename, column_name;
`;

const SchemaBrowser = () => {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
};
