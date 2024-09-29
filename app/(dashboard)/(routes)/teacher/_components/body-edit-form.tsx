"use client"
import { Button } from '@/components/ui/button'
import { TeacherProfile } from '@prisma/client'
import { Check, Pencil, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface BodyEditFormProps {
    item: TeacherProfile
}

const BodyEditForm = ({ item }: BodyEditFormProps) => {
    const router = useRouter()
    const isCompleted = item.body && item.subTitle && item.title && item.firstQuestion

    return (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>Body Content</h2>
                <Button
                    variant="outline"
                    className='flex items-center gap-2 text-sm bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300'
                    onClick={() => router.push(`/teacher/profile/${item.id}/body`)}
                >
                    Edit <Pencil className='h-4 w-4 ml-1' />
                </Button>
            </div>
            <div className='mt-4'>
                {isCompleted ? (
                    <div className='flex items-center text-green-600 dark:text-green-400 transition-all duration-300 transform hover:scale-105'>
                        <Check className='h-5 w-5 mr-2' />
                        <span className='text-lg font-semibold'>All sections completed</span>
                    </div>
                ) : (
                    <div className='flex items-center text-amber-600 dark:text-amber-400 transition-all duration-300 transform hover:scale-105'>
                        <AlertCircle className='h-5 w-5 mr-2' />
                        <span className='text-lg font-semibold'>Sections incomplete</span>
                    </div>
                )}
            </div>
            <div className='mt-4 text-sm text-gray-600 dark:text-gray-300'>
                <p className='font-medium'>Ensure all sections are filled out for a complete profile:</p>
                <ul className='list-disc list-inside mt-2 space-y-1'>
                    <li className={`${item.body ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'} transition-colors duration-300`}>Body content</li>
                    <li className={`${item.subTitle ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'} transition-colors duration-300`}>Subtitle</li>
                    <li className={`${item.title ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'} transition-colors duration-300`}>Title</li>
                    <li className={`${item.firstQuestion ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'} transition-colors duration-300`}>First question</li>
                </ul>
            </div>
        </div>
    )
}

export default BodyEditForm