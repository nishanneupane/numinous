import Image from 'next/image'
import React from 'react'

const MainLoading = () => {
  return (
    <div className='w-ful h-full flex flex-col justify-center items-center'>
        <Image
        src={"/logorm.png"}
        alt='Logo'
        width={200}
        height={150}
        className='animate-pulse duration-700'
        />
    </div>
  )
}

export default MainLoading