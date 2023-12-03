import { Metadata } from 'next'
import React from 'react'
import Navbar from '../(landing)/_components/navbar'
import { checkSubscription } from '@/lib/subscription'

export const metadata: Metadata = {
    title: "Companion | Numinous"
}
const CompanionLayout = async ({ children }: { children: React.ReactNode }) => {
    const isPro=await checkSubscription()
    return (
        <div>
            <Navbar isPro={isPro}/>
            <div className='max-w-6xl mx-auto mt-3'>
                {children}
            </div>
        </div>
    )
}

export default CompanionLayout