import { db } from '@/lib/db'
import React from 'react'
import ProfileItem from './_components/profile-item'

const CompanionPage = async () => {
    const profiles = await db.teacherProfile.findMany({
        where: {
            isPublished: true,
        },
        orderBy: {
            createdAt: "desc"
        },
        select: {
            title: true,
            subTitle: true,
            createdBy: true,
            id: true,
        }
    })
    return (
        <>
            {
                !profiles || profiles.length <= 0 ? (
                    <p className='text-xs items-center text-center text-muted-foreground'>No AI assistance profiles found</p>
                ) : (
                    <div className='flex flex-col gap-1'>
                        {
                            profiles.map((item) => (
                                <ProfileItem item={item} key={item.title} />
                            ))
                        }

                    </div>
                )
            }

        </>
    )
}

export default CompanionPage