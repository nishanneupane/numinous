import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'
import { Bot, Sparkles, Brain } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Authentication | Numinous',
}

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <div className="max-w-md mx-auto">
                    <Image
                        src="/logorm.png"
                        alt="Numinous Logo"
                        width={80}
                        height={80}
                        className="mb-8"
                    />
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                        Welcome to Numinous
                    </h1>
                    {children}
                </div>
            </div>
            <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-8">
                <div className="text-white text-center">
                    <h2 className="text-4xl font-bold mb-6">Create Your Custom Companion</h2>
                    <p className="text-xl mb-8">Join Numinous and bring your unique AI companions to life.</p>
                    <div className="flex justify-center space-x-8">
                        <div className="flex flex-col items-center">
                            <Bot className="w-12 h-12 mb-2" />
                            <span>Personalized AI</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <Sparkles className="w-12 h-12 mb-2" />
                            <span>Unique Interactions</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <Brain className="w-12 h-12 mb-2" />
                            <span>Intelligent Companions</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout