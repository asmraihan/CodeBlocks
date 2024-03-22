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
import { authSchema } from "@/lib/validations/auth"
import { toast } from "sonner"



type Inputs = z.infer<typeof authSchema>

export function SignInForm() {
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


    async function onSubmit(data: Inputs) {
        startTransition(async () => {
            try {
                const res = await userLogin(data);
                if (res && res.message) {
                    router.push("/");
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
        });
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