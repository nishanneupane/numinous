"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { TeacherProfile } from '@prisma/client'
import axios from 'axios'
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface TitleEditFormProps {
    item: TeacherProfile
}

const formSchema = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required",
    }).min(1)
})

const TitleEditForm = ({ item }: TitleEditFormProps) => {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(item.title || "")
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: title || ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/teacher/${item.id}`, values).then((res) => {
                toast.success(`Profile ${res.data.title} updated`)
                setIsEditing(false)
                setTitle(res.data.title)
                router.refresh()
            })
        } catch (error) {
            toast.error("Failed to edit title")
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6">
            {!isEditing && (
                <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-xl font-semibold text-gray-800 dark:text-white'>Title</h2>
                    <Button variant="ghost" className='flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300' onClick={() => setIsEditing(true)}>
                        Edit <Pencil className='h-4 w-4 ml-1' />
                    </Button>
                </div>
            )}
            {isEditing && (
                <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-xl font-semibold text-gray-800 dark:text-white'>Title</h2>
                    <Button variant="ghost" className='flex items-center gap-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300' onClick={() => setIsEditing(false)}>
                        Cancel
                    </Button>
                </div>
            )}

            {!isEditing && (
                <div className='text-start w-full'>
                    {item.title ? (
                        <p className='text-start text-sm text-gray-700 dark:text-gray-300'>{title}</p>
                    ) : (
                        <span className='text-gray-500 dark:text-gray-400 italic text-sm'>No Title</span>
                    )}
                </div>
            )}

            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl>
                                        <Input 
                                            placeholder='Enter your title here' 
                                            {...field} 
                                            className='rounded-md w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white' 
                                        />
                                    </FormControl>
                                    <FormDescription className='text-xs text-gray-500 dark:text-gray-400'>
                                        Give an appropriate title for the profile
                                    </FormDescription>
                                    <FormMessage className='text-red-500' />

                                    <Button 
                                        className='w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white transition duration-300'
                                    >
                                        Save
                                    </Button>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            )}
        </div>
    )
}

export default TitleEditForm