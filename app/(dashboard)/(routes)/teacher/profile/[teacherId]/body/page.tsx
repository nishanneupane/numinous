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
import { ArrowLeft, BookOpen, Save } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900">
      {!teacher.isPublished && (
        <Banner label='This profile is unpublished. Only you can see it.' variant="warning" />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 sm:p-10">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                Profile Body Setup
              </h1>
              <Link href={`/teacher/profile/${teacher.id}`}>
                <Button variant="outline" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Setup</span>
                </Button>
              </Link>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
              <div className="flex items-center space-x-3 text-indigo-600 dark:text-indigo-400">
                <BookOpen className="w-6 h-6" />
                <h2 className="text-xl font-semibold">Edit Your Profile Content</h2>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Craft your professional narrative here. Make it engaging and informative to attract potential students.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-inner border border-gray-200 dark:border-gray-700">
              <EditForm teacher={teacher} user={user} />
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 sm:px-10">
            <div className="flex justify-end">
              <Button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileBodyPage