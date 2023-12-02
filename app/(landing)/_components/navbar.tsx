"use client"
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useProModal } from "@/hooks/use-pro-modal";
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Navbar({ isPro }: { isPro: boolean }) {
    const proModal = useProModal()
    const router = useRouter()

    return (
        <nav className="flex w-screen items-center justify-between p-6 ">
            <div>
                <Link
                    className="flex items-center justify-center gap-2"
                    href="/"
                >
                    <Image
                        src={"/logorm.png"}
                        width={120}
                        height={80}
                        alt='Logo'
                        className='object-contain'
                    />
                    <UserButton afterSignOutUrl="/" />
                    <ModeToggle />
                </Link>
            </div>
            <div className="font-semibold text-lg">
                <div className="flex flex-row gap-x-4 items-center">
                    {
                        !isPro ? (
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button variant="primary" onClick={proModal.onOpen} className="text-white">Upgrade </Button>
                                </TooltipTrigger>
                                <TooltipContent className="flex items-center justify-center flex-wrap max-w-20">
                                    <p>Create your custom lead companions</p>
                                </TooltipContent>
                            </Tooltip>

                        ) : (
                            <Button variant="outline" onClick={() => router.push("/dashboard")}>Go to Dashboard </Button>
                        )
                    }
                    <Link href="/companions">
                        <Button variant="outline">Try Companions</Button>
                    </Link>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;
