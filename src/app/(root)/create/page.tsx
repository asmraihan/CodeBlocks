import React from "react";
import FormUpload from "./form-upload";


export default function Home() {
  return (
    <div className="my-10">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
            Create a new snippet
          </h2>
        </div>
      </div>
      <FormUpload />
    </div>
  );
}