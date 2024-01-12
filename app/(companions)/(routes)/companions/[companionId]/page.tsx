import ProfileTeacher from '@/components/profile'
import { db } from '@/lib/db';
import React from 'react'
import ChatForm from './_components/chat-form';
import { redirect } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

const CompanionIdPage = async ({ params }: { params: { companionId: string } }) => {
    
    const companion = await db.teacherProfile.findFirst({
        where: {
            id: params.companionId
        }
    })
    if (!companion || !companion.firstQuestion || !companion.prompt) {
        return null
    }
    const user = await db.profile.findUnique({
        where:{
            id:companion.userId
        }
    });
    if (!user) {
        return redirect("/");
    }
    return (
        <div className='flex items-center justify-between px-3 w-full'>
            <div className='w-full'>
                <ProfileTeacher user={user} teacher={companion} />
            </div>
            <div className='w-full px-2'>
                <ChatForm firstQuestion={companion.firstQuestion} prompt={companion.prompt} user={user} />
            </div>

            <div className="fixed top-0 right-2 text-xs">
                <Badge variant={"secondary"} className='text-xs font-light cursor-auto'>
                    <X className='text-rose-600 w-5 h-5 mr-2'/>
                    Don&apos;t refresh or else your conversation will be deleted
                </Badge>
            </div>
        </div>
    )
}

export default CompanionIdPage