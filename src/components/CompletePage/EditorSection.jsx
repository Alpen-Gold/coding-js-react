import { Editor } from "@monaco-editor/react";

const EditorSection = ({
  lastLang,
  editorColor,
  getDefaultValueForLanguage,
  question,
  editorRef,
  onMount,
  setCode,
}) => {
  return (
    <div id="question-ptoverka" className="">
      {/* Editor to the test ! */}
      <Editor
        height={"600px"}
        width={"100%"}
        language={lastLang}
        theme={`vs-${editorColor ? "dark" : "light"}`}
        value={getDefaultValueForLanguage(lastLang, question)}
        onClick={() => {
          if (editorRef.current) {
            editorRef.current.focus();
          }
        }}
        onMount={onMount}
        onChange={(event) => setCode(event)}
      />
    </div>
  );
};

export default EditorSection;
