import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { tags as t } from "@lezer/highlight";
import { draculaInit } from "@uiw/codemirror-theme-dracula";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";

export default function CodeEditor({code, setCode, selectedLanguage, setSelectedLanguage}) {
  const currentLanguage = selectedLanguage;
  const fullCode = code;
    console.log(fullCode, "fullCode")
  const onChange = (value: string) => {
    setCode({ ...fullCode, [currentLanguage]: value });
  }
  return (
    <CodeMirror
      value={fullCode[currentLanguage]}
      height="calc(100vh - 60px - 50px)"
      className="code-editor"
      extensions={[loadLanguage(currentLanguage)!]}
      onChange={onChange}
      theme={draculaInit({
        settings: {
          caret: "#c6c6c6",
          fontFamily: "monospace",
        },
        styles: [{ tag: t.comment, color: "#6272a4" }],
      })}
    />
  );
}