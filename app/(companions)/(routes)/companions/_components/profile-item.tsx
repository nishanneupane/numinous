import { Profile, TeacherProfile } from '@prisma/client'
import React, { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

type Props = {
    item: {
        id: string;
        title: string;
        subTitle: string | null;
        createdBy: string;
    }
}
const ProfileItem = ({ item }: Props) => {
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