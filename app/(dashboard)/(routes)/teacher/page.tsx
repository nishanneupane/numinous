import React from 'react'
import AddPageForm from './_components/add-page-form'
import { redirect } from 'next/navigation';
import { checkSubscription } from '@/lib/subscription';

const AddTeacherPage = async() => {
    const isPro = await checkSubscription();
    if(!isPro){
        return redirect("/")
    }
    return (
        <AddPageForm/>
    )
}

export default AddTeacherPage