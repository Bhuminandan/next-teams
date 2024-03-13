"use client"


import { 
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/tooltip"

interface ActionTooltipProps {
    label: string;
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
}

export const ActionTooltip = ( { label, children, side, align }: ActionTooltipProps ) => {
  return (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                {children}
            </TooltipTrigger>
            <TooltipContent
                side={side}
                align={align}
            >
                <p className="font-semibold text-sm capitalize">
                {label.toLocaleLowerCase()}
                </p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}
