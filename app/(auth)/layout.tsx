import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Authentication | Numinous',
}
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full h-full flex items-center justify-center mt-12'>
            {children}
        </div>
    )
}

export default AuthLayout