"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function DeleteAlert({ id }: { id: string }) {
    const router = useRouter()

    const onDelete = async () => {
        try {
            await axios.delete(`/api/teacher/${id}`).then(() => {
                toast.success("Deleted Successfully")
                router.push("/dashboard")
            })
        } catch (error) {
            toast.error("Error deletion")
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button><Trash className='h-4 w-4 text-rose-500' /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        profile.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
