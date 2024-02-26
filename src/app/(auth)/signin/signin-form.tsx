"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"

// import { authSchema } from "@/lib/validations/auth"
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
import { userLogin } from "@/lib/action/authActions"



// type Inputs = z.infer<typeof authSchema>

export function SignInForm() {
    const router = useRouter()
    const [isPending, startTransition] = React.useTransition()

    // react-hook-form
    const form = useForm<any>({

    })

    function onSubmit(data: any) {

        startTransition(async () => {
            try {
              await userLogin(data).then((res) => {
                console.log(res)
              })
              router.push("/")
            } catch (err) {
              console.log(err, "asm")
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
                                <Input
                                    type="text"
                                    placeholder="rodneymullen180@gmail.com"
                                    {...field}
                                />
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
                <Button type="submit" disabled={isPending}>
                    {isPending && (
                        <Icons.spinner
                            className="mr-2 size-4 animate-spin"
                            aria-hidden="true"
                        />
                    )}
                    Sign in
                    <span className="sr-only">Sign in</span>
                </Button>
            </form>
        </Form>
    )
}