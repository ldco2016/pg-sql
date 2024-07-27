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

  const runQuery = async (val) => {
    setLoading(true);
    const result = await api.runQuery(val);
    setLoading(false);
    setResults([{ query: val, ...result }, ...results]);
  };

  const [lastResult] = results;

  return (
    <div className="app">
      <Header
        loading={loading}
        runQuery={runQuery}
        value={value}
        setValue={setValue}
      />

      <Split
        className="split-horizontal"
        direction="horizontal"
        sizes={[75, 25]}
      >
        <Split className="split-vertical" direction="vertical" sizes={[75, 25]}>
          <Card>
            <CardBody>
              <h4>Enter Query</h4>
              <Editor value={value} setValue={setValue} />
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              {lastResult && lastResult.error ? (
                <h3>{lastResult.error}</h3>
              ) : (
                <>
                  <h4>Query Result</h4>
                  <PagedResults results={results} />
                </>
              )}
            </CardBody>
          </Card>
        </Split>

        <Card>
          <CardBody>
            <History runQuery={runQuery} results={results} />
          </CardBody>
        </Card>
      </Split>
    </div>
  );
};

export default App;
