"use client"
import Hint from "@/components/hint";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useProModal } from "@/hooks/use-pro-modal";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";


const MobileNav = ({ isPro }: { isPro: boolean }) => {
    const proModal = useProModal()
    const router = useRouter()
    const pathname = usePathname()
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className='h-6 w-6 md:hidden block' />
            </SheetTrigger>
            <SheetContent>
                <nav className="flex w-full items-center justify-between p-0 flex-col">
                    <div>
                        <Link
                            className="flex items-center justify-center gap-2"
                            href="/"
                        >
                            <Image
                                src={"/logorm.png"}
                                width={150}
                                height={110}
                                alt='Logo'
                                className='object-contain'
                            />

                        </Link>
                        <ModeToggle />

                    </div>
                    <div className="font-semibold text-lg">
                        <div className="flex gap-x-4 items-center flex-col w-full gap-3 px-5">
                            {
                                isPro ? (
                                    <Button variant="outline" onClick={() => router.push("/dashboard")}>Go to Dashboard </Button>
                                ) : (
                                    <Hint label="Create your custom lead companions">
                                        <Button variant="primary" onClick={proModal.onOpen} className="text-white w-full">Upgrade </Button>
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
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav