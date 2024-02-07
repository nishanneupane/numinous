import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface HintProps {
    label: string;
    children: React.ReactNode;
    align?: 'left' | 'right' | 'top' | 'bottom';
}
const Hint = ({ label, children, align }: HintProps) => {
    return (
        <Tooltip>
            <TooltipTrigger>
                {children}
            </TooltipTrigger>
            <TooltipContent className="flex items-center justify-center flex-wrap max-w-20">
                <p>{label}</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default Hint