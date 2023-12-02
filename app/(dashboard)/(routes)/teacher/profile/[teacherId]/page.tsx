import { DollarSign, LayoutDashboard, ListChecks, Trash } from 'lucide-react'
import React from 'react'
import PromptEditForm from '../../_components/prompt-edit-form'
import { db } from '@/lib/db'
import { initialProfile } from '@/lib/initialProfile'
import { redirectToSignIn } from '@clerk/nextjs'
import TitleEditForm from '../../_components/title-edit-form'
import { Button } from '@/components/ui/button'
import Banner from '@/components/ui/banner'
import ProfileBodyPage from './body/page'
import BodyEditForm from '../../_components/body-edit-form'
import PriceEditForm from '../../_components/price-edit-form'
import Actions from './_components/actions'
import { redirect } from 'next/navigation'
import { checkSubscription } from '@/lib/subscription'

const TeacherProfilePage = async ({ params }: { params: { teacherId: string } }) => {
    const isPro = await checkSubscription();
    if(!isPro){
        return redirect("/")
    }

    const user = await initialProfile();
    if (!user) {
        return redirectToSignIn()
    }
    const teacher = await db.teacherProfile.findFirst({
        where: {
            id: params.teacherId,
            userId: user.id
        }
    })

    if (!teacher) {
        return null
    }
    const requiredFields = [
        teacher.title,
        teacher.subTitle,
        teacher.firstQuestion,
        teacher.price,
        teacher.prompt,
        teacher.body,
    ]

    const totalField = requiredFields.length
    const completedFIelds = requiredFields.filter(Boolean).length

    const completionText = `(${completedFIelds}/${totalField})`

    return (
        <>
            {
                !teacher.isPublished && (
                    <Banner label='This profile is not published yet so that only you can see this ' variant={"warning"} />
                )
            }
            <div className='max-w-4xl mx-auto'>
                <div className='p-4 flex items-center justify-between'>
                    <div>
                        <h2 className='text-xl font-bold'>Profile Setup</h2>
                        <span className='text-sm text-muted-foreground'>complete all fields {completionText} </span>
                    </div>
                    <Actions totalField={totalField} completedFIelds={completedFIelds} id={teacher.id} isPublished={teacher.isPublished||false} />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                    <div className='space-y-2'>
                        <div className='flex items-center gap-2 flex-col w-full'>
                            <div className='flex items-center space-x-2 w-full'>
                                <LayoutDashboard className='h-10 w-10 bg-sky-200 text-sky-500 rounded-lg p-2' />
                                <h1 className='text-lg text-muted-foreground'>Customize Your Prompt</h1>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-800 w-full p-2 flex items-center flex-col gap-2 rounded-md border border-gray-200 dark:border-gray-700 justify-start">
                                <TitleEditForm item={teacher} />
                            </div>
                        </div>


                        <div className="bg-slate-50 dark:bg-slate-800 w-full p-2 flex items-center flex-col gap-2 rounded-md border border-gray-200 dark:border-gray-700 justify-start">
                            <PromptEditForm item={teacher} />
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <div className='flex items-center gap-2 flex-col w-full'>
                            <div className='flex items-center space-x-2 w-full'>
                                <ListChecks className='h-10 w-10 bg-sky-200 text-sky-500 rounded-lg p-2' />
                                <h1 className='text-lg text-muted-foreground'>Profile Body</h1>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-800 w-full p-2 flex items-center flex-col gap-2 rounded-md border border-gray-200 dark:border-gray-700 justify-start">
                                <BodyEditForm item={teacher} />
                            </div>
                        </div>
                        <div className='flex items-center gap-2 flex-col w-full py-3'>
                            <div className='flex items-center space-x-2 w-full'>
                                <DollarSign className='h-10 w-10 bg-sky-200 text-sky-500 rounded-lg p-2' />
                                <h1 className='text-lg text-muted-foreground'>Price</h1>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-800 w-full p-2 flex items-center flex-col gap-2 rounded-md border border-gray-200 dark:border-gray-700 justify-start">
                                <PriceEditForm id={teacher.id} oldPrice={teacher.price?.toString() || "0"} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default TeacherProfilePage