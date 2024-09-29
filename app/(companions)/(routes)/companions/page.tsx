import { db } from '@/lib/db'
import React from 'react'
import ProfileItem from './_components/profile-item'
import { Loader2 } from 'lucide-react'

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-center mb-2">AI Companions</h1>
            <p className="text-center text-muted-foreground mb-8">Explore our range of AI assistants</p>
            
            {!profiles || profiles.length <= 0 ? (
                <div className="flex flex-col items-center justify-center h-[60vh]">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="mt-4 text-sm text-muted-foreground">No AI assistance profiles found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {profiles.map((item) => (
                        <ProfileItem item={item} key={item.id} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default CompanionPage