"use client"

import { SignUpSchema } from "@/app/schemas/auth"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import z from "zod";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router=useRouter();
    const form = useForm({
        resolver: zodResolver(SignUpSchema as any),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })
    async function onSubmit(data: z.infer<typeof SignUpSchema>){
        startTransition(async ()=>{
            await authClient.signUp.email({
                name:data.name,
                email:data.email,
                password:data.password,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Signed in successfully");
                        router.push("/");
                    },
                    onError: (error) => {
                        toast.error(error.error.message );
                    }
                }
            });
        })
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-center">Sign Up</CardTitle>
                <CardDescription className="text-center">
                Create an account to get started
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-y-3">
                        <Controller
                            name="name"
                            control={form.control}
                            render={({field,fieldState})=>(
                                <Field>
                                    <FieldLabel>Full Name</FieldLabel>
                                    <Input placeholder="John Doe" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]}/>
                                    )}
                                </Field>
                            )}
                            />
                        <Controller
                            name="email"
                            control={form.control}
                            render={({field,fieldState})=>(
                                <Field>
                                    <FieldLabel>Email</FieldLabel>
                                    <Input placeholder="john.doe@example.com" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]}/>
                                    )}
                                </Field>
                            )}
                            />
                        <Controller
                            name="password"
                            control={form.control}
                            render={({field,fieldState})=>(
                                <Field>
                                    <FieldLabel>Password</FieldLabel>
                                    <div className="relative">
                                        <Input type={showPassword ? "text" : "password"} placeholder="••••••" {...field}  />
                                        <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                            {showPassword ? <Eye /> : <EyeOff />}
                                        </button>
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]}/>
                                    )}
                                </Field>
                            )}
                            />
                        <div className="flex justify-center">
                            <Button className="hover:bg-white" disabled={isPending}>
                                {isPending ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" /> 
                                    <span>Signing up..</span>
                                </>
                                ) : (
                                <span>Sign Up</span>)}
                            </Button>
                        </div>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}
