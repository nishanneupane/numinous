import { db } from '@/lib/db'
import { initialProfile } from '@/lib/initialProfile'
import { redirectToSignIn } from '@clerk/nextjs'
import React from 'react'
import ProfileItem from './_components/profile-item'

const CompanionPage = async () => {
    const profiles = await db.teacherProfile.findMany({
        where: {
            isPublished: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    const user = await initialProfile();
    if (!user) {
        return redirectToSignIn()
    }
    return (
        <div className='flex flex-col gap-1'>
            {
                profiles.map((item) => (
                    <ProfileItem item={item} user={user} />
                ))
            }

        </div>
    )
}

export default CompanionPage