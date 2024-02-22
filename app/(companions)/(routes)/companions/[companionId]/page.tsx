import ProfileTeacher from '@/components/profile'
import { db } from '@/lib/db';
import React from 'react'
import ChatForm from './_components/chat-form';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

const CompanionIdPage = async ({ params }: { params: { companionId: string } }) => {

    const companion = await db.teacherProfile.findFirst({
        where: {
            id: params.companionId
        }
    })
    if (!companion || !companion.firstQuestion || !companion.prompt) {
        return null
    }
    const admin = await db.profile.findUnique({
        where: {
            id: companion.userId
        },
        select: {
            name: true,
            email: true,
            imageUrl: true,
        }
    });

    if (!admin) {
        toast.error("No Admin Details found")
        return redirect("/")
    }

    return (
        <div className='flex items-center flex-col md:flex-row justify-between px-3 w-full space-y-3 mt-5'>
            <div className='w-full hidden md:flex'>
                <ProfileTeacher user={admin!} teacher={companion} />
            </div>

            <div className='w-full px-2'>
                <ChatForm firstQuestion={companion.firstQuestion} prompt={companion.prompt} user={admin!} />
            </div>
            <div className='w-full flex md:hidden'>
                <ProfileTeacher user={admin!} teacher={companion} />
            </div>
            <div className="fixed top-0 right-2 text-xs">
                <Badge variant={"secondary"} className='text-xs font-light cursor-auto scale-75 md:scale-100'>
                    <X className='text-rose-600 w-5 h-5 mr-2' />
                    Don&apos;t refresh or else your conversation will be deleted
                </Badge>
            </div>
        </div>
    )
}

export default CompanionIdPage