"use client"
import {  AtomIcon, LayoutDashboard, Plus, Settings, User2 } from 'lucide-react';
import React from 'react'
import SidebarItem from './sidebar-item';

const leaderRoutes = [
    {
        icon: LayoutDashboard,
        label: "Dashboard",
        href: "/dashboard",
    },
    {
        icon: Plus,
        label: "Create",
        href: "/teacher",
    },
    {
        icon: AtomIcon,
        label: "Try Companions",
        href: "/companions",
    },
    {
        icon: Settings,
        label: "Profile",
        href: "/profile",
    },
]


const Sidebar = () => {
    return (
        <div className='w-[80px] mt-[-10px] h-screen bg-slate-800 fixed z-10'>
            <div className='h-full border-r flex flex-col overflow-y-auto shadow-sm bg-white dark:bg-neutral-900'>
                <div className="flex flex-col w-full">

                    <div className='flex flex-col w-full justify-between'>
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