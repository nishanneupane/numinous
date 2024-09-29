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
        <nav className="w-full bg-background shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/logorm.png"
                                width={100}
                                height={40}
                                alt='Logo'
                                className='object-contain'
                            />
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        {!pathname.includes("/companions") && (
                            <Link href="/companions">
                                <Button variant="ghost">Try Companions</Button>
                            </Link>
                        )}
                        {isPro ? (
                            <Button variant="outline" onClick={() => router.push("/dashboard")}>Dashboard</Button>
                        ) : (
                            <Hint label="Create your custom lead companions">
                                <Button variant="default" onClick={proModal.onOpen}>Upgrade</Button>
                            </Hint>
                        )}
                        <ModeToggle />
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                        <SignedOut>
                            <SignInButton mode="modal" afterSignInUrl="/" afterSignUpUrl="/">
                                <Button variant="outline">Sign In</Button>
                            </SignInButton>
                        </SignedOut>
                    </div>
                    <div className="md:hidden flex items-center">
                        <MobileNav isPro={isPro} />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
