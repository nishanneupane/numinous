import React from 'react'
import Banner from '@/components/ui/banner'
import { redirectToSignIn } from '@clerk/nextjs';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import EditForm from './_components/edit-form';
import { initialProfile } from '@/lib/initialProfile';
import { checkSubscription } from '@/lib/subscription';
import { redirect } from 'next/navigation';

const ProfileBodyPage = async ({ params }: { params: { teacherId: string } }) => {
  const isPro = await checkSubscription();
  if (!isPro) {
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


  return (
    <>
      {
        !teacher.isPublished && (
          <Banner label='This profile is not published yet so that only you can see this ' variant={"warning"} />
        )
      }
      <div className='p-4 flex items-center justify-between'>
        <div>
          <h2 className='text-xl font-bold'>Body Setup</h2>
        </div>
        <div className=' flex items-center justify-center gap-2'>
          <h2 className='flex '>
            <Button variant={"ghost"} >
              <Link href={`/teacher/profile/${teacher.id}`}>
                Move to setup Page
              </Link>
            </Button>
          </h2>

        </div>
      </div>
      <div className='max-w-6xl mx-auto shadow-sm border border-gray-200 border-1 bg-slate-50 dark:bg-slate-800 mt-5 p-1 rounded-md dark:border-gray-500'>
        <EditForm teacher={teacher} user={user} />
      </div>
    </>
  )
}

export default ProfileBodyPage