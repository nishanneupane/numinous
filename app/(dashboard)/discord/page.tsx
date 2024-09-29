import { Button } from '@/components/ui/button'
import { Users2 } from 'lucide-react'
import Link from 'next/link'

const DiscordPage = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center flex-col space-y-6 px-4 md:px-0 py-2 bg-background'>
            <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-center bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent'>
                Join Our Discord Community
            </h1>
            <p className='text-muted-foreground text-center md:text-lg max-w-2xl'>
                Connect with our vibrant community on Discord. Get support, share ideas, and collaborate with fellow users and our dedicated team.
            </p>
            <Link href="https://discord.gg/xmQx49kw" className='w-full max-w-md'>
                <Button className='w-full py-6 text-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl'>
                    <Users2 className='h-6 w-6 mr-3' />
                    Join Our Discord Server
                </Button>
            </Link>
        </div>
    )
}

export default DiscordPage