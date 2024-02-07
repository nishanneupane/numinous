"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
        required_error: "Prompt is required",
        invalid_type_error: "Prompt is required",
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
                toast.success(`Profile ${res.data.title} created`)
                setIsEditing(false)
                setTitle(title)
                form.reset()
                router.refresh()
            })

        } catch (error) {
            toast.error("Failed to edit title")
        }
    }
    return (
        <>
            {
                !isEditing && (
                    <div className='flex items-center justify-between px-2 w-full'>
                        <h2 className='text-xl font-semibold '>Title</h2>
                        <Button variant="ghost" className='flex items-center gap-2 text-sm' onClick={() => setIsEditing(true)}>Edit <Pencil className=' h-4 w-4 ml-1' /></Button>
                    </div>
                )
            }
            {
                isEditing && (
                    <div className='flex items-center justify-between px-2 w-full'>
                        <h2 className='text-xl font-semibold '>Title</h2>
                        <Button variant="ghost" className='flex items-center gap-2 text-sm' onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>
                )
            }



            {
                !isEditing && (
                    <div className='text-start w-full px-1'>
                        {
                            item.title ? (
                                <p className='text-start text-sm'>{title}</p>
                            ) : (
                                <span className='text-muted-foreground italic text-sm'>No Title</span>
                            )
                        }
                    </div>
                )
            }

            {
                isEditing && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                            <FormField
                                control={form.control}
                                name='title'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormControl>
                                            <Input placeholder='Enter your title here' {...field} className='rounded-md w-full' />
                                        </FormControl>
                                        <FormDescription className='text-xs text-muted-foreground'>Give a appropriate title for the profile</FormDescription>
                                        <FormMessage />

                                        <Button className='w-full'>
                                            Save
                                        </Button>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                )
            }
        </>
    )
}

export default TitleEditForm