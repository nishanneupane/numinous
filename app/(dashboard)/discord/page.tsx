import { Button } from '@/components/ui/button'
import { Users2 } from 'lucide-react'
import Link from 'next/link'

const DiscordPage = () => {
    return (
        <div
            className='w-full h-screen flex items-center justify-center flex-col space-y-3 px-3 md:px-0 py-2 bg-slate-100 dark:bg-transparent'
        >
            <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-t from-teal-400 to-blue-600 bg-clip-text text-transparent'>Discord community</h1>
            <p className='text-muted-foreground md:text-base text-sm'>Join Discord if you face any queries . Our team is here to help you.</p>

            <Link href={"https://discord.gg/xmQx49kw"} className='w-full flex items-center md:justify-center justify-start'>
                <Button className='w-[50%] flex items-center md:justify-center justify-start bg-gradient-to-t from-teal-400 to-blue-600 text-white font-bold truncate'>
                    <Users2 className='h-4 w-4 mr-2' />
                    Join Discord
                </Button>
            </Link>
        </div>
    )
}

export default DiscordPage