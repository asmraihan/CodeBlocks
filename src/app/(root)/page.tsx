import { Button } from "@/components/ui/button";

import React from "react";
import { Animation } from "./animation";

export default function Page() {
  return (
    <div className="bg-background">
      <div className="px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-4xl py-16 sm:py-24 lg:py-28">
          <div className="text-center">
            <Animation />
          </div>
        </div>
      </div>
    </div>
  );
}