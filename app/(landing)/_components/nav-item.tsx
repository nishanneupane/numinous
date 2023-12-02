"use client"
import { Button } from '@/components/ui/button'
import { useProModal } from '@/hooks/use-pro-modal'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const NavItem = ({ isPro }: { isPro: boolean }) => {
    const router = useRouter()
    const proModal = useProModal()
    return (
        <div className='py-3 w-full'>
            {
                isPro ? (
                    <Button variant="default" onClick={() => router.push("/teacher")} className="md:text-xl bg-gradient-to-r from-teal-500 to to-blue-500 w-full text-white p-2">
                        Create now
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                ) : (
                    <Button variant="default" onClick={proModal.onOpen} className="md:text-xl bg-gradient-to-r from-teal-500 to to-blue-500 w-full text-white p-2">
                        Create now
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                )
            }
        </div>
    )
}

export default NavItem