"use client";

import React, { useState } from "react";
import AceEditor from "react-ace";
import { useTheme } from "next-themes";

import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/mode-tsx";
import "ace-builds/src-noconflict/mode-python";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import { Skeleton } from "@/components/ui/skeleton";


function CodeEditor({
  handleCodeChange,
  language,
}: {
  handleCodeChange: any;
  language: string;
}) {
  const { theme } = useTheme();
  const [editorLoaded, setEditorLoaded] = useState(false);

  React.useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <>
      {editorLoaded ? (
        <AceEditor
          mode={language}
          theme={theme === "light" ? "github" : "monokai"}
          onChange={handleCodeChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          className="!w-full border rounded-md"
        />
      ) : (
        <Skeleton className="h-[31.25rem]" />
      )}
    </>
  );
}

export default CodeEditor;