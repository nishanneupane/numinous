"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
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
                form.reset()
                router.push(`/teacher/profile/${res.data.id}`)
            })
        } catch (error) {
            toast.error("Error creating")
        }
    }
    const isLoading = form.formState.isLoading
    const isSubmitting = form.formState.isSubmitting
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
                                    Companion Title
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder='Saas Product Create Ideas'  {...field} />
                                </FormControl>
                                <FormDescription className='text-xs px-2' >
                                    Give a appropriate title to your Companion
                                </FormDescription>

                                <Button className='w-full' disabled={form.formState.isSubmitting || form.formState.isLoading}>
                                    {
                                        (isLoading || isSubmitting) ? (
                                            <Loader2 className='h-4 w-4 text-secondary animate-spin' />
                                        ) : (
                                            <p className='text-secondary'>Create</p>
                                        )
                                    }

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