import "./editor.css";
import "codemirror/theme/material.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/sql/sql";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/sql-hint";
import "codemirror/addon/comment/comment";

import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

const Editor = ({ value, setValue }) => {
  return (
    <CodeMirror
      value={value}
      options={{
        mode: "text/x-pgsql",
        theme: "material",
        lineNumbers: true,
        tabMode: "indent",
        tabSize: 2,
        extraKeys: {
          "Cmd-/": "toggleComment",
          "Ctrl-/": "toggleComment",
        },
      }}
      onBeforeChange={(e, data, value) => {
        setValue(value);
      }}
      editorDidMount={(editor) => {
        editor.getWrapperElement().style.fontSize = "16px";
      }}
      onKeyDown={(editor, event) => {
        const { keyCode } = event;

        const cursor = editor.getDoc().getCursor();
        const token = editor.getTokenAt(cursor);

        if (event.ctrlKey) {
          return;
        }

        if (token.type === "string") {
          return;
        }

        if (token.type === "keyword" && keyCode === 32) {
          return editor.showHint();
        }

        if (
          (keyCode >= 65 && keyCode <= 90) ||
          (keyCode >= 97 && keyCode <= 122) ||
          keyCode === 46
        ) {
          editor.showHint({
            completeSingle: false,
          });
        }
      }}
    />
  );
};

export default Editor;
