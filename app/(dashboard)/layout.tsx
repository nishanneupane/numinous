import Navbar from '@/components/navbar'
import { checkSubscription } from '@/lib/subscription'
import { redirect } from 'next/navigation'
import React from 'react'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const isPro = await checkSubscription()
    if (!isPro) {
        return redirect("/")
    }
    return (
        <div className='flex flex-col'>
            <Navbar />
            <main className='mt-[80px]'>
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout