"use client"
import { Button } from '@/components/ui/button'
import { useProModal } from '@/hooks/use-pro-modal'
import { Crown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const NavItem = ({ isPro }: { isPro: boolean }) => {
    const router = useRouter()
    const proModal = useProModal()
    return (
        <div className='py-3 w-full'>
            {
                isPro ? (
                    <Button size={"lg"} variant="default" onClick={() => router.push("/teacher")} className="md:text-xl bg-gradient-to-r from-teal-500 to to-blue-500 w-full text-white p-2">
                        <Crown className='h-5 w-5 mr-2 text-white font-extrabold' />Create now
                    </Button>
                ) : (
                    <Button size={"lg"} variant="default" onClick={proModal.onOpen} className="md:text-xl bg-gradient-to-r from-teal-500 to to-blue-500 w-full text-white p-2">
                        <Crown className='h-5 w-5 mr-2 text-white font-extrabold' />Create now
                    </Button>
                )
            }
        </div>
    )
}

export default NavItem