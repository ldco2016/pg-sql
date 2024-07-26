import "./app.css";
import "./components/resizer.css";
import "./assets/scss/theme.scss";
import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import Editor from "./components/editor";
import Split from "react-split";

import api from "./api";
import PagedResults from "./components/paged-results";
import History from "./components/history";
import Header from "./components/header";

const DEFAULT_QUERY = ``;

const App = () => {
  const [value, setValue] = useState(DEFAULT_QUERY);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.provisionInstance();
  }, []);

  return (
    <div className="app">
      <Header />
    </div>
  );
};

export default App;
