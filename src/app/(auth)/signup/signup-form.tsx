"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { PasswordInput } from "@/components/shared/password-input"
import { userRegister } from "@/lib/action/authActions"
import { authSchema } from "@/lib/validations/auth"

type Inputs = z.infer<typeof authSchema>

export function SignUpForm() {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  // react-hook-form

  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })


  function onSubmit(data: any) {

    startTransition(async () => {
      try {
        const res = await userRegister(data);
        if (res && res.message) {
          router.push("/signup/verify-email")
          toast.message("Check your email", {
            description: "We sent you a 6-digit verification code.",
          })
        } else {
          toast.error("Error", {
            description: "Invalid credentials",
          });
        }
      } catch (err) {
        if (err instanceof Error) {
          toast.error("Error", {
            description: err.message,
          });
        }
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="rodneymullen180@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Continue
          <span className="sr-only">Continue to email verification page</span>
        </Button>
      </form>
    </Form>
  )
}