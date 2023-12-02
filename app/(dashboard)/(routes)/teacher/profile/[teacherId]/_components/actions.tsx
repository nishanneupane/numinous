"use client"
import { Button } from '@/components/ui/button'
import axios from 'axios';
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';
import { DeleteAlert } from './delete-alert';

const Actions = ({ totalField, completedFIelds, id, isPublished }: { totalField: number; completedFIelds: number, id: string, isPublished: boolean }) => {
    const router = useRouter();
    const onPublish = async () => {
        await axios.patch(`/api/teacher/${id}`, { isPublished: !isPublished }).then((res) => {
            toast.success("Successful")
            router.push(`/dashboard`)
        }).catch(() => {
            toast.error("Failed to publish")
        })
    }

    return (
        <div className=' flex items-center justify-center gap-2'>
            <h2 className='flex '>
                <Button variant={"ghost"} disabled={totalField !== completedFIelds} onClick={onPublish}>
                    {
                        isPublished ? "UnPublish" : "Publish"
                    }
                </Button>
            </h2>
            <DeleteAlert id={id}/>
        </div>
    )
}

export default Actions