import { Button } from "@/components/ui/button";

import React from "react";
import { Animation } from "./animation";
import { getGithubStars } from "../../lib/fetchers/githubStar";

export default async function Page() {

  const githubStarsPromise = getGithubStars()

  const [githubStars] = await Promise.all([
    githubStarsPromise,
  ])


  return (
    <div className="bg-background">
      <div className="px-6 lg:px-8">
        <div className="mx-auto max-w-4xl py-16 sm:py-24 lg:py-28">
          <div className="text-center">
            <Animation githubStars={githubStars} />
          </div>
        </div>
      </div>
    </div>
  );
}