"use client"
import ProfileTeacher from '@/components/profile'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Profile, TeacherProfile } from '@prisma/client'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
    subTitle: z.string({
        required_error: "Subtitle is required",
        invalid_type_error: "Subtitle is required",
    }),
    firstQuestion: z.string({
        required_error: "FirstQuestion is required",
        invalid_type_error: "FirstQuestion is required",
    }),
    body: z.string({
        required_error: "Body is required",
        invalid_type_error: "Body is required",
    }).min(5),
})

const EditForm = ({ teacher, user }: { teacher: TeacherProfile; user: Profile }) => {
    const router = useRouter()

    const [subTitle, setSubTitle] = useState(teacher.subTitle || "")
    const [firstQuestion, setFirstQuestion] = useState(teacher.firstQuestion || "")
    const [body, setBody] = useState(teacher.body || "")
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            subTitle: subTitle || "",
            firstQuestion: firstQuestion || "",
            body: body || "",
        }

    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/teacher/${teacher.id}`, values).then((res) => {
                toast.success(`Profile ${res.data.title} Updated`)
                form.reset()
                router.refresh()
            })

        } catch (error) {
            toast.error("Failed to add body")
        }
    }
    const onLoading = form.formState.isSubmitting
    const onValid = form.formState.isValid
    const isSubmitting = form.formState.isSubmitting

    const handleCancel = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        form.reset()
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className='space-y-2'>

                <div className='flex items-center gap-2 flex-col w-full'>

                    <div className="bg-slate-50 dark:bg-slate-800 w-full p-2 flex items-center flex-col gap-2 rounded-md border border-gray-200 dark:border-gray-700 justify-start">
                        <div className='w-full p-2'>
                            <Form {...form}>
                                <form className='space-y-3' onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField
                                        control={form.control}
                                        name='subTitle'
                                        render={({ field }) => (
                                            <FormItem className='bg-slate-100 dark:bg-slate-700 rounded-md p-2'>
                                                <FormLabel>SubTitle</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Your Subtitle here ...' {...field} />
                                                </FormControl>
                                                <FormDescription className='text-xs px-1'>Enter your sweet subtitle here</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='firstQuestion'
                                        render={({ field }) => (
                                            <FormItem className='bg-slate-100 dark:bg-slate-700 rounded-md p-2'>
                                                <FormLabel>First Question</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder='Ask Your First Question ...' {...field} />
                                                </FormControl>
                                                <FormDescription className='text-xs px-1'>Give users first question to interact with you</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='body'
                                        render={({ field }) => (
                                            <FormItem className='bg-slate-100 dark:bg-slate-700 rounded-md p-2'>
                                                <FormLabel>Body</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder='Your Body goes here ...' {...field} />
                                                </FormControl>
                                                <FormDescription className='text-xs px-1'>Write your profile body of the topic</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className='flex items-center justify-end gap-2'>
                                        <Button
                                            type='button'
                                            variant={"ghost"}
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </Button>
                                        <Button disabled={onLoading || !onValid} type='submit'>
                                            {
                                                (onLoading || isSubmitting) ? (
                                                    <Loader2 className='h-4 w-4 text-secondary animate-spin' />
                                                ) : (
                                                    <p className='text-secondary'>Save</p>
                                                )
                                            }
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>


            <ProfileTeacher user={user} teacher={teacher} />
        </div>
    )
}

export default EditForm