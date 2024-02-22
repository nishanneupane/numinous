import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'

export const metadata: Metadata = {
    title: 'Authentication | Numinous',
}
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full h-full flex items-center flex-col md:flex-row justify-center mt-0 md:mt-12 px-6 space-x-3'>
            <Image
                src={"/smile.png"}
                height={300}
                width={400}
                alt='Demo'
                className='object-fit w-[50%] md:w-full'
            />
            {children}
        </div>
    )
}

export default AuthLayout