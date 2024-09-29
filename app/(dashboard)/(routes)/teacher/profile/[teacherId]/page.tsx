import { DollarSign, LayoutDashboard, ListChecks } from 'lucide-react'
import React from 'react'
import PromptEditForm from '../../_components/prompt-edit-form'
import { db } from '@/lib/db'
import { initialProfile } from '@/lib/initialProfile'
import { redirectToSignIn } from '@clerk/nextjs'
import TitleEditForm from '../../_components/title-edit-form'
import Banner from '@/components/ui/banner'
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
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
            {!teacher.isPublished && (
                <Banner label='This profile is not published yet so that only you can see this ' variant={"warning"} />
            )}
            <div className='max-w-6xl mx-auto px-4 py-8'>
                <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8'>
                    <div className='flex items-center justify-between mb-6'>
                        <div>
                            <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>Profile Setup</h2>
                            <span className='text-sm text-gray-600 dark:text-gray-400'>Complete all fields {completionText}</span>
                        </div>
                        <Actions totalField={totalField} completedFIelds={completedFIelds} id={teacher.id} isPublished={teacher.isPublished||false} />
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        <div className='space-y-6'>
                            <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-6'>
                                <div className='flex items-center mb-4'>
                                    <LayoutDashboard className='h-8 w-8 text-blue-500 mr-3' />
                                    <h3 className='text-xl font-semibold text-gray-800 dark:text-white'>Customize Your Prompt</h3>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                                    <TitleEditForm item={teacher} />
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mt-4">
                                    <PromptEditForm item={teacher} />
                                </div>
                            </div>
                        </div>
                        <div className='space-y-6'>
                            <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-6'>
                                <div className='flex items-center mb-4'>
                                    <ListChecks className='h-8 w-8 text-green-500 mr-3' />
                                    <h3 className='text-xl font-semibold text-gray-800 dark:text-white'>Profile Body</h3>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                                    <BodyEditForm item={teacher} />
                                </div>
                            </div>
                            <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-6'>
                                <div className='flex items-center mb-4'>
                                    <DollarSign className='h-8 w-8 text-yellow-500 mr-3' />
                                    <h3 className='text-xl font-semibold text-gray-800 dark:text-white'>Price</h3>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                                    <PriceEditForm id={teacher.id} oldPrice={teacher.price?.toString() || "0"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherProfilePage