"use client";

import React from "react";
import { addSnippet } from "@/app/action/addSnippet"; 
import { LanguageSelector } from "./language-selector";
import CodeEditor from "./code-editor";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import UploadButton from "./upload-button";

export default function FormUpload() {
  const [code, setCode] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [title, setTitle] = React.useState("");

  const handleCodeChange = (newValue: string) => {
    setCode(newValue);
    console.log(newValue);
  };
  return (
    <form
      action={async (formData: FormData) => {
        const result = await addSnippet(formData);
        if (result?.error) {
          toast.error("Something went wrong. Please try again.");
        } else {
          toast.success("Snippet created successfully. Redirecting...");
        }
      }}
      className="py-8"
    >
      <Textarea
        className="hidden"
        name="code"
        placeholder="code"
        value={code}
        readOnly={true}
      />
      <Input
        type="hidden"
        name="language"
        placeholder="language"
        value={language}
        readOnly={true}
      />

      <div className="flex gap-x-4">
        <Input
          name="title"
          placeholder="Name your Snippet"
          onChange={(e) => setTitle(e.target.value)}
        />
        <LanguageSelector language={language} setLanguage={setLanguage} />
      </div>

      <div className="mt-4">
        <h1 className="text-lg font-normal">Code &darr;</h1>
        <CodeEditor handleCodeChange={handleCodeChange} language={language} />
      </div>

      <UploadButton canSubmit={!!code && !!language && !!title} />
    </form>
  );
}