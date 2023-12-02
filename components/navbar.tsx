"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

const Navbar = ({ isSite }: { isSite?: boolean }) => {
    return (
        <nav>
            <div className='flex items-center justify-between px-2 fixed h-[70px] bg-secondary w-full'>
                <div className='flex items-center justify-center gap-3' >
                    <Link href={"/"}>
                        <Image
                            src={"/logorm.png"}
                            width={120}
                            height={80}
                            alt='Logo'
                            className='object-contain'
                        />
                    </Link>
                    <Button size={"sm"} className='hidden md:block'>
                        <Link href={"/teacher"}>
                            Create
                        </Link>
                    </Button>
                    <Button size={"icon"} className='md:hidden flex items-center justify-center'>
                        <Link href={"/teacher"}>
                            <Plus className='h-4 w-4 flex items-center justify-center' />
                        </Link>
                    </Button>
                </div>



                <div className="flex items-center justify-center gap-3">
                    {
                        isSite && (
                            <Button variant={"outline"}>
                                <Link href={"/dashboard"}>
                                    Try it
                                </Link>
                            </Button>
                        )
                    }
                    <ModeToggle />
                    <UserButton afterSignOutUrl='/' />
                </div>
            </div>
        </nav>
    )
}

export default Navbar