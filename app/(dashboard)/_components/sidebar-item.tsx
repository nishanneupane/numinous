"use client"
import { LucideIcon } from 'lucide-react'
import React from 'react'
import { usePathname, useRouter } from "next/navigation"
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
};
const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (pathname === "/" && href === "/") || pathname === href || pathname?.startsWith(`${href}/`)
    const onClick = () => {
        router.push(href)
    }

    return (
        <button
            onClick={onClick}
            type='button'
            className={cn(
                "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 h-full",
                isActive && "text-sky-700 dark:bg-sky-300 bg-sky-200/20 hover:bg-sky-200/20 hover:text-slate-700"
            )}
        >
            <div className="flex items-center gap-x-2 py-4 w-full">
                <Tooltip>
                    <TooltipTrigger>
                        <Icon size={22} className={cn("text-slate-500 w-full", isActive && "text-sky-700 dark:text-slate-700 ")} />
                    </TooltipTrigger>
                    <TooltipContent>
                        {label}
                    </TooltipContent>
                </Tooltip>
            </div>
            <div className={cn("ml-auto opacity-0 border-2 border-sky-700 h-full transition-all", isActive && "opacity-100")} />
        </button>
    )
}

export default SidebarItem