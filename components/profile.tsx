"use client"
import { TeacherProfile } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from './ui/scroll-area'

const ProfileTeacher = ({user,teacher}:{user:any;teacher:TeacherProfile}) => {
    return (
        <div className='w-full space-y-2 mt-3'>
            <div className='flex items-center justify-around gap-2 bg-gray-200 dark:bg-slate-700 rounded-md shadow-md p-2'>
                <Image
                    src={user.imageUrl}
                    width={200}
                    height={200}
                    alt={user.name}
                    className='rounded-full object-contain border p-1'
                />
                <div className="flex items-center justify-center flex-col gap-2">
                    <h1 className='text-2xl font-bold text-center truncate bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent'>{user.name}</h1>
                    <span className='text-muted-foreground text-xs'>{user.email}</span>
                </div>
            </div>

            <div className='flex items-center justify-start text-start flex-col w-full'>
                <Card className='w-full'>
                    <CardHeader>
                        <CardTitle>
                            <h1 className='text-lg font-semibold'>{teacher.title}</h1>
                            <span className='text-sm text-muted-foreground font-normal'>{teacher.subTitle}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1 className='font-normal text-sm text-cyan-500'>First Question :- <span className='text-primary font-semibold text-md'> {teacher.firstQuestion}</span></h1>

                        <div className='mt-3'>
                            <h1 className='text-lg font-semibold text-muted-foreground'>Body</h1>
                            <div className='mt-1 bg-slate-50 dark:bg-slate-800 border border-1 border-gray-200 dark:border-gray-600 shadow-md flex items-center justify-start text-start p-2 rounded-md'>
                                <ScrollArea className='text-start font-sans text-neutral-700 dark:text-neutral-200 h-[300px]'>{teacher.body}</ScrollArea>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}

export default ProfileTeacher