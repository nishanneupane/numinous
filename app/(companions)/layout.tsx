import { Metadata } from 'next'
import React from 'react'
import Navbar from '../(landing)/_components/navbar'

export const metadata: Metadata = {
    title: "Companion | Numinous"
}
const CompanionLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto mt-3'>
                {children}
            </div>
        </div>
    )
}

export default CompanionLayout