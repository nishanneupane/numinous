import Navbar from '@/components/navbar'
import { checkSubscription } from '@/lib/subscription'
import { redirect } from 'next/navigation'
import React from 'react'
import Sidebar from './_components/sidebar'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const isPro = await checkSubscription()
    if (!isPro) {
        return redirect("/")
    }
    return (
        <div className='flex flex-col'>
            <Navbar />
            <main className='mt-[80px] flex'>
                <Sidebar />
                <div className='ml-[80px] w-full'>
                    {children}
                </div>
            </main>
        </div>
    )
}

export default DashboardLayout