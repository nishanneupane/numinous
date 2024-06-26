"use client"
import Hint from "@/components/hint";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import MobileNav from "./mobile-nav";

function Navbar({ isPro }: { isPro: boolean }) {
    const proModal = useProModal()
    const router = useRouter()
    const pathname = usePathname()

    return (
        <nav className="w-full flex items-center justify-between p-6">
            <div className="flex items-center justify-between w-full">
                <Link
                    href="/"
                    className="flex items-center justify-center"
                >
                    <Image
                        src={"/logorm.png"}
                        width={120}
                        height={80}
                        alt='Logo'
                        className='object-contain'
                    />
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                </Link>
                <div className="space-x-3">
                    <ModeToggle/>
                    <MobileNav isPro={isPro} />
                </div>
            </div>
            <div className="font-semibold text-lg hidden md:block">
                <div className="flex flex-row gap-x-4 items-center">
                    {
                        isPro ? (
                            <Button variant="outline" onClick={() => router.push("/dashboard")}>Go to Dashboard </Button>
                        ) : (
                            <Hint label="Create your custom lead companions">
                                <Button variant="primary" onClick={proModal.onOpen} className="text-white">Upgrade </Button>
                            </Hint>
                        )
                    }

                    {
                        !pathname.includes("/companions") ? (
                            <Link href="/companions">
                                <Button variant="outline">Try Companions</Button>
                            </Link>
                        ) : null
                    }
                    <SignedOut>
                        <SignInButton
                            mode="modal"
                            afterSignInUrl="/"
                            afterSignUpUrl="/"
                        />
                    </SignedOut>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;
