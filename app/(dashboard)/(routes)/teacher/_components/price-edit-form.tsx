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

interface PriceEditFormProps {
    id: string;
    oldPrice: string;
}
const formSchema = z.object({
    price: z.string()
})
const PriceEditForm = ({ id, oldPrice }: PriceEditFormProps) => {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const [price, setPrice] = useState(oldPrice || "0")
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: price || "0"
        }

    })
    const priceToFormat = parseFloat(oldPrice || "0")
    const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(priceToFormat);
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const numericPrice = Number(values.price); // Convert the price to a number
            const updatedValues = { ...values, price: numericPrice };

            await axios.patch(`/api/teacher/${id}`, updatedValues).then((res) => {
                toast.success(`Profile ${res.data.title} updated`);
                setIsEditing(false);
                form.reset();
                router.refresh();
            });
        } catch (error) {
            toast.error("Failed to update");
        }
    };
    return (
        <>
            {
                !isEditing && (
                    <div className='flex items-center justify-between px-2 w-full'>
                        <h2 className='text-xl font-semibold '>Price</h2>
                        <Button variant="ghost" className='flex items-center gap-2 text-sm' onClick={() => setIsEditing(true)}>Edit <Pencil className=' h-4 w-4 ml-1' /></Button>
                    </div>
                )
            }
            {
                isEditing && (
                    <div className='flex items-center justify-between px-2 w-full'>
                        <h2 className='text-xl font-semibold '>Price</h2>
                        <Button variant="ghost" className='flex items-center gap-2 text-sm' onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>
                )
            }



            {
                !isEditing && (
                    <div className='text-start w-full px-1'>
                        {
                            oldPrice ? (
                                <p className='text-start text-sm'>{formatted || price}</p>
                            ) : (
                                <span className='text-muted-foreground italic text-sm'>No Price Available</span>
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
                                name='price'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl className='w-full'>
                                            <Input placeholder='Enter your price here' {...field} className='rounded-md w-full' />
                                        </FormControl>
                                        <FormDescription className='text-xs text-muted-foreground'>Give the affordable price to your consumer.</FormDescription>
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

export default PriceEditForm