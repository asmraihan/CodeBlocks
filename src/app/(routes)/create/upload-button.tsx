"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export default function UploadButton({ canSubmit }: { canSubmit: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending || !canSubmit}
      type="submit"
      className="float-right mt-6 mb-20"
    >
      {pending ? "Creating..." : "Create Snippet"}
    </Button>
  );
}