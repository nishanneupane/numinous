"use client"
import ProfileTeacher from '@/components/profile'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Profile, TeacherProfile } from '@prisma/client'
import axios from 'axios'
import { Loader2, Save, X, User, MessageSquare, FileText } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
    subTitle: z.string().min(1, "Subtitle is required").max(100, "Subtitle must be less than 100 characters"),
    firstQuestion: z.string().min(1, "First question is required").max(200, "First question must be less than 200 characters"),
    body: z.string().min(5, "Body must be at least 5 characters long").max(10000, "Body must be less than 10000 characters"),
})

const EditForm = ({ teacher, user }: { teacher: TeacherProfile; user: Profile }) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [previewTeacher, setPreviewTeacher] = useState(teacher)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            subTitle: teacher.subTitle || "",
            firstQuestion: teacher.firstQuestion || "",
            body: teacher.body || "",
        }
    })

    useEffect(() => {
        form.reset({
            subTitle: teacher.subTitle || "",
            firstQuestion: teacher.firstQuestion || "",
            body: teacher.body || "",
        })
        setPreviewTeacher(teacher)
    }, [teacher, form])

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        try {
            const response = await axios.patch(`/api/teacher/${teacher.id}`, values)
            toast.success(`Profile ${response.data.title} Updated`)
            setPreviewTeacher(response.data)
            router.refresh()
        } catch (error) {
            toast.error("Failed to update profile")
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        form.reset()
        setPreviewTeacher(teacher)
    }

    const handleFieldChange = (field: keyof typeof formSchema.shape, value: string) => {
        setPreviewTeacher(prev => ({ ...prev, [field]: value }))
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
                <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white border-b pb-4">Edit Profile</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="subTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-semibold flex items-center">
                                        <User className="w-5 h-5 mr-2 text-blue-500" />
                                        Subtitle
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Your catchy subtitle..." 
                                            {...field} 
                                            onChange={(e) => {
                                                field.onChange(e)
                                                handleFieldChange('subTitle', e.target.value)
                                            }}
                                            className="bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 transition-all duration-300" 
                                        />
                                    </FormControl>
                                    <FormDescription className="text-sm text-gray-500 dark:text-gray-400 mt-2">A brief, engaging description of your profile</FormDescription>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="firstQuestion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-semibold flex items-center">
                                        <MessageSquare className="w-5 h-5 mr-2 text-green-500" />
                                        First Question
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea 
                                            placeholder="What would you like to ask your students?" 
                                            {...field} 
                                            onChange={(e) => {
                                                field.onChange(e)
                                                handleFieldChange('firstQuestion', e.target.value)
                                            }}
                                            className="bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-green-500 transition-all duration-300 min-h-[100px]" 
                                        />
                                    </FormControl>
                                    <FormDescription className="text-sm text-gray-500 dark:text-gray-400 mt-2">An engaging question to start the conversation</FormDescription>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="body"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-semibold flex items-center">
                                        <FileText className="w-5 h-5 mr-2 text-purple-500" />
                                        Profile Body
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea 
                                            placeholder="Tell us about yourself and your teaching style..." 
                                            {...field} 
                                            onChange={(e) => {
                                                field.onChange(e)
                                                handleFieldChange('body', e.target.value)
                                            }}
                                            className="bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 transition-all duration-300 min-h-[200px]" 
                                        />
                                    </FormControl>
                                    <FormDescription className="text-sm text-gray-500 dark:text-gray-400 mt-2">Detailed information about your experience and approach</FormDescription>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end space-x-4 mt-8">
                            <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading} className="px-6 py-2 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <X className="w-4 h-4 mr-2" /> Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading || !form.formState.isDirty} className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all duration-300">
                                {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
                <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white border-b pb-4">Profile Preview</h2>
                <ProfileTeacher user={user} teacher={previewTeacher} />
            </div>
        </div>
    )
}

export default EditForm