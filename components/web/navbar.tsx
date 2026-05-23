"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import Image from "next/image";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export function Navbar() {
    const router = useRouter();
    const { theme } = useTheme();
    const { isAuthenticated, isLoading } = useConvexAuth();
    if (isLoading) {
        return null;
    }
    return (
        <nav className="fixed top-0 left-0 z-50 w-full  py-5 px-5 flex items-center justify-between bg-white dark:bg-black">
            <div className="flex items-center gap-8 ">
                <div>
                    <Image
                        src={theme === "light" ? "/logo_black_text.svg" : "/logo.svg"}
                        alt="Logo"
                        width={190}
                        height={36}
                        className="h-10 w-auto"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        className={`${buttonVariants({ variant: "ghost" })} px-3 text-base border-b border-transparent pb-1 hover:text-red-500 hover:border-b-red-500`}
                        href="/"
                    >
                        Home
                    </Link>
                    <Link
                        className={`${buttonVariants({ variant: "ghost" })} px-3 text-base border-b border-transparent pb-1 hover:text-red-500 hover:border-b-red-500`}
                        href="/about"
                    >
                        About Us
                    </Link>
                    <Link
                        className={`${buttonVariants({ variant: "ghost" })} px-3 text-base border-b border-transparent pb-1 hover:text-red-500 hover:border-b-red-500`}
                        href="/events"
                    >
                        Events
                    </Link>
                    <Link
                        className={`${buttonVariants({ variant: "ghost" })} px-3 text-base border-b border-transparent pb-1 hover:text-red-500 hover:border-b-red-500`}
                        href="/speakers"
                    >
                        Speakers
                    </Link>
                    <Link
                        className={`${buttonVariants({ variant: "ghost" })} px-3 text-base border-b border-transparent pb-1 hover:text-red-500 hover:border-b-red-500`}
                        href="/buy"
                    >
                        Buy Now
                    </Link>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {isAuthenticated ? (
                    <Link className={`${buttonVariants({})} bg-red-500 text-white hover:!text-black hover:!bg-black dark:hover:!text-red-500 dark:hover:!bg-white`} href="/" onClick={() => authClient.signOut({
                        fetchOptions: {
                            onSuccess: async () => {
                                router.refresh();
                                router.push("/");
                                toast.success("Logged out successfully!");
                            },
                            onError: () => {
                                toast.error("Error occurred while logging out!");
                            }
                        }
                    })}>
                        Log Out
                    </Link>
                ) : (
                    <>
                        <Link
                            className={`${buttonVariants({})} bg-red-500 text-white hover:!text-black hover:!bg-black dark:hover:!text-red-500 dark:hover:!bg-white`}
                            href="/auth/signup"
                        >
                            Sign up
                        </Link>
                        <Link
                            className={`${buttonVariants({ variant: "outline" })} hover:bg-white hover:text-red-500`}
                            href="/auth/login"
                        >
                            Login
                        </Link>
                    </>
                )}
                <ThemeToggle />
            </div>
        </nav>
    )
}