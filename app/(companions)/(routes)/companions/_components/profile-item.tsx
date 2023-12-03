import { Profile, TeacherProfile } from '@prisma/client'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ProfileItemProps {
    item: TeacherProfile;
}
const ProfileItem = ({ item }: ProfileItemProps) => {
    return (
        <div className='shadow-sm'>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <div className='flex items-center justify-between px-3'>
                            <p>{item.title}</p>
                            <Button variant={"primary"} size={"sm"} className='text-white'>
                                <Link href={`/companions/${item.id}`} >
                                    Try Now
                                </Link>
                            </Button>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className='flex items-center justify-between '>
                    <CardDescription>{item.subTitle}</CardDescription>
                    <p className='text-xs text-muted-foreground flex justify-end'>{item.createdBy}</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProfileItem