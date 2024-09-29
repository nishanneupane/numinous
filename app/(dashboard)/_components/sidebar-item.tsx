"use client"
import { LucideIcon } from 'lucide-react'
import React from 'react'
import { usePathname, useRouter } from "next/navigation"
import { cn } from '@/lib/utils';

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
};

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (pathname === "/" && href === "/") || pathname === href || pathname?.startsWith(`${href}/`);

    const onClick = () => {
        router.push(href);
    };

    return (
        <button
            onClick={onClick}
            type='button'
            className={cn(
                "flex items-center w-full px-3 py-2 mb-1 transition-all duration-300 ease-in-out",
                "rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800",
                "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50",
                "group relative",
                isActive && "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
            )}
        >
            <div className="flex items-center">
                <Icon size={22} className={cn(
                    "transition-all duration-300",
                    isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                )} />
                <span className={cn(
                    "ml-3 font-medium text-sm transition-all duration-300",
                    isActive ? "text-white" : "text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white",
                    "opacity-0 group-hover:opacity-100 w-0 group-hover:w-auto"
                )}>
                    {label}
                </span>
            </div>
            {isActive && (
                <div className="absolute inset-y-0 right-0 w-1 bg-white rounded-l-full" />
            )}
        </button>
    );
};

export default SidebarItem;