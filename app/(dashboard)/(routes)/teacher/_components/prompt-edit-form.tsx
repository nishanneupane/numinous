"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
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

interface PromptEditFormProps {
    item: TeacherProfile
}
const formSchema = z.object({
    prompt: z.string({
        required_error: "Prompt is required",
        invalid_type_error: "Prompt is required",
    }).min(5)
})
const PromptEditForm = ({ item }: PromptEditFormProps) => {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const [prompt, setPrompt] = useState(item.prompt || "")
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: prompt || ""
        }

    })
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/teacher/${item.id}`, values).then((res) => {
                toast.success(`Profile ${res.data.title} updated`)
                setPrompt(res.data.prompt)
                setIsEditing(false)
                form.reset()
                router.refresh()
            })

        } catch (error) {
            toast.error("Failed to add Prompt")
        }
    }
    return (
        <>
            {
                !isEditing && (
                    <div className='flex items-center justify-between px-2 w-full'>
                        <h2 className='text-xl font-semibold '>Prompt</h2>
                        <Button variant="ghost" className='flex items-center gap-2 text-sm' onClick={() => setIsEditing(true)}>Edit <Pencil className=' h-4 w-4 ml-1' /></Button>
                    </div>
                )
            }
            {
                isEditing && (
                    <div className='flex items-center justify-between px-2 w-full'>
                        <h2 className='text-xl font-semibold '>Prompt</h2>
                        <Button variant="ghost" className='flex items-center gap-2 text-sm' onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>
                )
            }



            {
                !isEditing && (
                    <div className='text-start w-full px-1'>
                        {
                            item.prompt ? (
                                <ScrollArea className='text-start text-sm  h-[200px]'>{prompt}</ScrollArea>
                            ) : (
                                <span className='text-muted-foreground italic text-sm'>No Prompt</span>
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
                                name='prompt'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea placeholder='Enter your prompt here' {...field} className='rounded-md w-full min-h-[200px]' />
                                        </FormControl>
                                        <FormDescription className='text-xs text-muted-foreground'>Give the prompt so that the logic of conversation can be decided.</FormDescription>
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

export default PromptEditForm