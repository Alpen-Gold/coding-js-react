import React, { useEffect, useRef } from "react";

const MonacoEditorComponent = ({ data }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const initializeEditor = async () => {
      if (window.require) {
        const require = window.require;

        require.config({
          paths: {
            vs: "https://unpkg.com/monaco-editor@0.12.0/min/vs",
          },
        });

        const proxy = URL.createObjectURL(
          new Blob(
            [
              `
              self.MonacoEnvironment = {
                baseUrl: 'https://unpkg.com/monaco-editor@0.12.0/min/'
              };
              importScripts('https://unpkg.com/monaco-editor@0.12.0/min/vs/base/worker/workerMain.js');
              `,
            ],
            { type: "text/javascript" }
          )
        );

        window.MonacoEnvironment = { getWorkerUrl: () => proxy };

        require(["vs/editor/editor.main"], () => {
          editorRef.current = monaco.editor.create(
            document.getElementById("question-ptoverka"),
            {
              value: `function ${data.fun_name} {\n\n}`,
              language: "javascript",
              theme: "vs-dark",
            }
          );
        });
      }
    };

    initializeEditor();
  }, [data]);

  const getCode = () => {
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      console.log(code);
    }
  };

  return (
    <div>
      <button onClick={getCode}>Get Code</button>
      <div
        id="question-ptoverka"
        style={{ height: "500px", width: "100%" }}
      ></div>
    </div>
  );
};

export default MonacoEditorComponent;
