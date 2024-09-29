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
            const response = await axios.post("/api/teacher", values)
            toast.success(`Companion Created: ${response.data.title}`)
            form.reset()
            router.push(`/teacher/profile/${response.data.id}`)
        } catch (error) {
            toast.error("Error creating companion")
        }
    }

    const isLoading = form.formState.isLoading
    const isSubmitting = form.formState.isSubmitting

    return (
        <div className='max-w-3xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6'>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Create New Companion</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-gray-700 dark:text-gray-300'>Companion Title</FormLabel>
                                <FormControl>
                                    <Input placeholder='e.g. SaaS Product Idea Generator' className="bg-gray-50 dark:bg-gray-700" {...field} />
                                </FormControl>
                                <FormDescription className='text-xs text-gray-500 dark:text-gray-400'>
                                    Give an appropriate title to your Companion
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button 
                        type="submit"
                        className='w-full bg-blue-600 hover:bg-blue-700 text-white transition duration-300'
                        disabled={isSubmitting || isLoading}
                    >
                        {(isLoading || isSubmitting) ? (
                            <Loader2 className='h-5 w-5 animate-spin' />
                        ) : (
                            'Create Companion'
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default AddPageForm