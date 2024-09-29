"use client"
import { LayoutDashboard, PlusCircle, Users, MessageCircle, UserCircle } from 'lucide-react';
import React from 'react'
import SidebarItem from './sidebar-item';

const leaderRoutes = [
    {
        icon: LayoutDashboard,
        label: "Dashboard",
        href: "/dashboard",
    },
    {
        icon: PlusCircle,
        label: "Create",
        href: "/teacher",
    },
    {
        icon: MessageCircle,
        label: "Discord",
        href: "/discord",
    },
    {
        icon: Users,
        label: "Try Companions",
        href: "/companions",
    },
    {
        icon: UserCircle,
        label: "Profile",
        href: "/profile",
    },
]

const Sidebar = () => {
    return (
        <div className='w-[80px] h-full fixed z-10 transition-all duration-300 hover:w-[200px] group'>
            <div className='h-full border-r flex flex-col overflow-y-auto shadow-lg bg-gray-50 dark:bg-gray-900'>
                <div className="flex flex-col w-full">
                    <div className='p-6'>
                        <h1 className='text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>Numinous</h1>
                    </div>
                    <div className='flex flex-col w-full justify-between space-y-2'>
                        {
                            leaderRoutes.map((route) => (
                                <SidebarItem
                                    key={route.href}
                                    icon={route.icon}
                                    label={route.label}
                                    href={route.href}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar