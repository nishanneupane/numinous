"use client"
import { TeacherProfile } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from './ui/scroll-area'
import { MessageSquare, FileText } from 'lucide-react'

type Props = {
    user: {
        name: string;
        email: string;
        imageUrl: string;
    },
    teacher: TeacherProfile
}

const ProfileTeacher = ({ user, teacher }: Props) => {
    return (
        <div className='w-full space-y-4 mt-3'>
            <Card className='overflow-hidden'>
                <div className='relative h-32 bg-gradient-to-r from-blue-400 to-purple-400'>
                    <div className='absolute -bottom-12 left-1/2 transform -translate-x-1/2'>
                        <div className='w-[120px] h-[120px] rounded-full border-3 border-white dark:border-gray-800 bg-gray-100 flex items-center justify-center overflow-hidden shadow-md'>
                            {user.imageUrl ? (
                                <Image
                                    src={user.imageUrl}
                                    width={120}
                                    height={120}
                                    alt={user.name}
                                    className='rounded-full object-cover'
                                />
                            ) : (
                                <span className='text-3xl font-semibold text-gray-500'>{user.name[0]}</span>
                            )}
                        </div>
                    </div>
                </div>
                <CardContent className='pt-20 text-center'>
                    <h1 className='text-3xl font-bold'>{user.name}</h1>
                    <p className='text-muted-foreground'>{user.email}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>
                        <h2 className='text-2xl font-semibold'>{teacher.title}</h2>
                        <p className='text-lg text-muted-foreground'>{teacher.subTitle}</p>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='space-y-4'>
                        <div>
                            <h3 className='text-xl font-semibold flex items-center'>
                                <MessageSquare className="w-5 h-5 mr-2 text-green-500" />
                                First Question
                            </h3>
                            <p className='mt-2 p-4 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200'>
                                {teacher.firstQuestion}
                            </p>
                        </div>
                        <div>
                            <h3 className='text-xl font-semibold flex items-center'>
                                <FileText className="w-5 h-5 mr-2 text-purple-500" />
                                Profile Body
                            </h3>
                            <p className='mt-2 p-4 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200'>
                                {teacher.body}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProfileTeacher