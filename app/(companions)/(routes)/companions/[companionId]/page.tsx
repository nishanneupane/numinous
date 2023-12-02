import ProfileTeacher from '@/components/profile'
import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initialProfile'
import { redirectToSignIn } from '@clerk/nextjs';
import React from 'react'
import ChatForm from './_components/chat-form';

const CompanionIdPage = async ({ params }: { params: { companionId: string } }) => {
    const user = await initialProfile();
    if (!user) {
        return redirectToSignIn();
    }
    const companion = await db.teacherProfile.findFirst({
        where: {
            id: params.companionId
        }
    })
    if (!companion || !companion.firstQuestion || !companion.prompt) {
        return null
    }
    return (
        <div className='flex items-center justify-between px-3 w-full'>
            <div className='w-full'>
                <ProfileTeacher user={user} teacher={companion} />
            </div>
            <div className='w-full px-2'>
                <ChatForm firstQuestion={companion.firstQuestion} prompt={companion.prompt} user={user} />
            </div>
        </div>
    )
}

export default CompanionIdPage