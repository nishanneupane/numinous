import ProfileTeacher from '@/components/profile'
import { db } from '@/lib/db';
import React from 'react'
import ChatForm from './_components/chat-form';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

const CompanionIdPage = async ({ params }: { params: { companionId: string } }) => {
    const companion = await db.teacherProfile.findFirst({
        where: { id: params.companionId }
    });

    if (!companion || !companion.firstQuestion || !companion.prompt) {
        return null;
    }

    const admin = await db.profile.findUnique({
        where: { id: companion.userId },
        select: {
            name: true,
            email: true,
            imageUrl: true,
        }
    });

    if (!admin) {
        toast.error("No Admin Details found");
        return redirect("/");
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="order-2 md:order-1">
                    <ChatForm 
                        firstQuestion={companion.firstQuestion} 
                        prompt={companion.prompt} 
                        user={admin} 
                    />
                </div>
                <div className="order-1 md:order-2">
                    <ProfileTeacher user={admin} teacher={companion} />
                </div>
            </div>
            <div className="fixed top-4 right-4 z-50">
                <Badge variant="secondary" className="text-xs font-light animate-pulse">
                    <X className="text-rose-600 w-4 h-4 mr-2" />
                    Don&apos;t refresh or your conversation will be lost
                </Badge>
            </div>
        </div>
    );
}

export default CompanionIdPage;