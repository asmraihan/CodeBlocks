"use client"

import * as React from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"


export function OAuthSignIn() {
    
  const [isLoading, setIsLoading] = React.useState<any | null>(null)

    const signInLoaded = true
  async function oauthSignIn(provider: any) {
  
  }

  const oauthProviders = [
    { name: "Google",  icon: "google" },
    { name: "Facebook",  icon: "facebook" },
    { name: "Discord", icon: "discord" },
  ] satisfies {
    name: string
    icon: keyof typeof Icons
  }[]

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon]

        return (
          <Button
            aria-label={`Sign in with ${provider.name}`}
            variant="outline"
            className="w-full bg-background sm:w-auto"
            disabled={isLoading !== null}
          >
            {isLoading ? (
              <Icons.spinner
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            ) : (
              <Icon className="mr-2 size-4" aria-hidden="true" />
            )}
            {provider.name}
          </Button>
        )
      })}
    </div>
  )
}