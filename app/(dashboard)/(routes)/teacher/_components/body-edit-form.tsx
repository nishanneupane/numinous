"use client"
import { Button } from '@/components/ui/button'
import { TeacherProfile } from '@prisma/client'
import { Check, Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'


interface BodyEditFormProps {
    item: TeacherProfile
}

const BodyEditForm = ({ item }: BodyEditFormProps) => {
    const router = useRouter()
    return (
        <>
            <div className='flex items-center justify-between px-2 w-full'>
                <h2 className='text-xl font-semibold '>Body</h2>
                <Button variant="ghost" className='flex items-center gap-2 text-sm' onClick={() => router.push(`/teacher/profile/${item.id}/body`)}>Edit <Pencil className=' h-4 w-4 ml-1' /></Button>
            </div>
            <div className='text-start w-full px-1'>
                {
                    item.body && item.subTitle && item.title && item.firstQuestion ? (
                        <p className='text-start text-sm flex items-center justify-start'>Completed <Check className='text-teal-500 h-4 w-4 ml-2' /></p>
                    ) : (
                        <span className='text-muted-foreground italic text-sm'>Not completed</span>
                    )
                }
            </div>
        </>
    )
}

export default BodyEditForm