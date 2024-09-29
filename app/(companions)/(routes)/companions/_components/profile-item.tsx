import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type Props = {
    item: {
        id: string;
        title: string;
        subTitle: string | null;
        createdBy: string;
        category?: string;
    }
}

const ProfileItem = ({ item }: Props) => {
    return (
        <Card className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
            <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-300 mb-2 sm:mb-0">{item.title}</h2>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.subTitle}</p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col space-y-4">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Created by: {item.createdBy}</p>
                    {item.category && (
                        <span className="text-xs font-semibold bg-indigo-100 dark:bg-indigo-600 text-indigo-800 dark:text-white px-2 py-1 rounded-full self-start">
                            {item.category}
                        </span>
                    )}
                    <Button variant="outline" size="sm" className="w-full bg-transparent border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-300 dark:text-indigo-300 dark:hover:bg-indigo-800 transition-all duration-300">
                        <Link href={`/companions/${item.id}`} className="flex items-center justify-center w-full">
                            Explore <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProfileItem