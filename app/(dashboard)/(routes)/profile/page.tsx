import { UserProfile, UserButton, currentUser, SignOutButton } from '@clerk/nextjs'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { User, Settings, LogOut } from 'lucide-react'

const ProfilePage = async () => {
    const user = await currentUser();

    return (
        <div className='w-full max-w-4xl mx-auto p-6 transition-all duration-300 ease-in-out transform hover:scale-[1.01]'>
            <Card className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white dark:text-gray-200 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Welcome, {user?.username ?? 'Guest'}!</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-4">
                        <UserButton afterSignOutUrl="/" />
                        <p className="text-lg">Manage your profile and account settings</p>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Button variant="outline" className="flex items-center justify-center space-x-2 h-16 transition-all duration-200 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900 dark:hover:text-blue-300">
                    <User className="w-6 h-6" />
                    <span>Edit Profile</span>
                </Button>
                <Button variant="outline" className="flex items-center justify-center space-x-2 h-16 transition-all duration-200 hover:bg-purple-100 hover:text-purple-600 dark:hover:bg-purple-900 dark:hover:text-purple-300">
                    <Settings className="w-6 h-6" />
                    <span>Account Settings</span>
                </Button>
                <SignOutButton>
                    <Button variant="destructive" className="flex items-center justify-center space-x-2 h-16 w-full transition-all duration-200 hover:bg-red-700 dark:hover:bg-red-800">
                        <LogOut className="w-6 h-6" />
                        <span>Sign Out</span>
                    </Button>
                </SignOutButton>
            </div>

            <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                <CardContent className="p-0">
                    <UserProfile
                        appearance={{
                            elements: {
                                rootBox: {
                                    boxShadow: "none",
                                    width: "100%"
                                },
                                card: {
                                    border: "none",
                                    boxShadow: "none",
                                    width: "100%"
                                },
                                navbar: {
                                    display: "none"
                                },
                                pageScrollBox: {
                                    padding: "2rem"
                                }
                            },
                            variables: {
                                colorPrimary: "#3B82F6",
                                colorText: "#1F2937",
                                colorTextSecondary: "#4B5563",
                                colorBackground: "#F9FAFB",
                                colorInputBackground: "#F3F4F6",
                                colorInputText: "#1F2937",
                                borderRadius: "0.5rem"
                            },
                            layout: {
                                shimmer: true
                            },
                            
                        }}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default ProfilePage