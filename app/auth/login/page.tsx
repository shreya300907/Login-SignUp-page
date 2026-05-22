"use client"

import { LoginSchema } from "@/app/schemas/auth"
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
import { useEffect, useState } from "react";
import z from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";

export default function LoginPage(){
    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false);
    const [retryCount, setRetryCount]= useState(0);
    const [retryAfter, setRetryAfter] = useState(0);
    const router=useRouter();
    const form = useForm({
        resolver: zodResolver(LoginSchema as any),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    useEffect(()=>{
        if(retryAfter<=0){
            setRetryCount(0);
            return;
        }
        const timer= setInterval(()=>{
            setRetryAfter((retryAfter)=> retryAfter - 1);
        },1000);
        return ()=> clearInterval(timer);
    },[retryAfter])

    async function onSubmit(data: z.infer<typeof LoginSchema>){
        if (retryAfter > 0) {
            toast.error(
                `Too many attempts. Try again in ${retryAfter} seconds.`
            );
            return;
        }
        startTransition(async ()=>{
            await authClient.signIn.email({
                email:data.email,
                password:data.password,
                fetchOptions: {
                    onSuccess: () => {
                        setRetryCount(0);
                        toast.success("Signed in successfully");
                        router.refresh();
                        router.push("/");
                    },
                    onError: (error) => {
                        setRetryCount((retryCount)=> retryCount + 1);
                        if(retryCount>= 5){
                            setRetryAfter(60);
                            toast.error("Too many failed attempts. Please try again after 60 seconds.");
                        }else{
                            toast.error(error.error.message );
                        }
                    }
                }
            });
        })
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-center">Log In</CardTitle>
                <CardDescription className="text-center">
                Sign in to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-y-3">
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
                                    <span>Signing in..</span>
                                </>
                                ) : (
                                <span>Login</span>)}
                            </Button>
                        </div>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}