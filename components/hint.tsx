import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface HintProps {
    label: string;
    children: React.ReactNode;
    side?: 'left' | 'right' | 'top' | 'bottom';
}
const Hint = ({ label, children, side }: HintProps) => {
    return (
        <Tooltip>
            <TooltipTrigger>
                {children}
            </TooltipTrigger>
            <TooltipContent side={side} className="flex items-center justify-center flex-wrap max-w-20">
                <p>{label}</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default Hint