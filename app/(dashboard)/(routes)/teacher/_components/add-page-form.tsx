"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    })
})
const AddPageForm = () => {
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        }
    })
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post("/api/teacher", values).then((res) => {
                toast.success(`Lead Created`)
                router.push(`/teacher/profile/${res.data.id}`)
                form.reset()
            })
        } catch (error) {
            toast.error("Error creating")
        }
    }
    return (
        <div className='max-w-3xl mx-auto border border-gray-100 dark:border-slate-700 rounded-md shadow-sm p-2'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='mt-12'>
                    <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='px-1'>
                                    Title
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder='Saas Product Create Ideas'  {...field} />
                                </FormControl>
                                <FormDescription className='text-xs px-2' >
                                    Drop here your sweet lead task here
                                </FormDescription>

                                <Button className='w-full'>
                                    Create
                                </Button>
                                <FormMessage />
                            </FormItem>
                        )}

                    />
                </form>
            </Form>
        </div>
    )
}

export default AddPageForm