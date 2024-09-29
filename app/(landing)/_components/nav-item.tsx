"use client"
import { Button } from '@/components/ui/button'
import { useProModal } from '@/hooks/use-pro-modal'
import { Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const NavItem = ({ isPro }: { isPro: boolean }) => {
    const router = useRouter()
    const proModal = useProModal()
    return (
        <div className='py-2 w-full'>
            {
                isPro ? (
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push("/teacher")}
                        className="w-full text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-gray-700 border border-indigo-200 dark:border-indigo-700 rounded-full transition-all duration-300 ease-in-out shadow-sm"
                    >
                        <Sparkles className='h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400' />
                        Create AI Companion
                    </Button>
                ) : (
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={proModal.onOpen}
                        className="w-full text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-gray-700 border border-indigo-200 dark:border-indigo-700 rounded-full transition-all duration-300 ease-in-out shadow-sm"
                    >
                        <Sparkles className='h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400' />
                        Upgrade to Create
                    </Button>
                )
            }
        </div>
    )
}

export default NavItem