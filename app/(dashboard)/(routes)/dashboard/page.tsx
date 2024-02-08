import React from 'react'
import { DataTable } from './_components/data-table'
import { columns } from './_components/column'
import { initialProfile } from '@/lib/initialProfile'
import { db } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { checkSubscription } from '@/lib/subscription'
import { redirect } from 'next/navigation'
import Hint from '@/components/hint'

const DashboardPage = async () => {
    const isPro = await checkSubscription();
    if (!isPro) {
        return redirect("/")
    }
    const profile = await initialProfile();
    if (!profile) {
        return redirectToSignIn()
    }
    const data = await db.teacherProfile.findMany({
        where: {
            userId: profile.id
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return (
        <div className="container mx-auto py-10">
            <div className='flex items-center justify-end py-1'>
                <div className="block md:hidden">
                    <Hint label='Add New Profile'>
                        <Button>
                            <Link href={"/teacher"}>
                                <Plus className='h-4 w-4' />
                            </Link>
                        </Button>
                    </Hint>
                </div>
                <Button className='hidden md:block'>
                    <Link href={"/teacher"}>
                        Add new Companion
                    </Link>
                </Button>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default DashboardPage