import React from 'react'
import Image from 'next/image'
import { TooltipTrigger } from '@radix-ui/react-tooltip'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent } from '@/components/ui/tooltip'

type AnimateCardProps = {
  imageSrc: string
  width: number
  height: number
  triggerLabel: string
}

const AnimateCard = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement> & AnimateCardProps
>(
  (
    { imageSrc, width, height, triggerLabel, children, className, ...props },
    ref
  ) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="link"
            className={cn(
              'uppercase font-extrabold text-5xl border-2 border-muted bg-muted/40 h-fit p-2',
              className
            )}
          >
            {triggerLabel}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="border-4 border-primary bg-slate-900 flex ">
          <Image src={imageSrc} alt="animated image" width={200} height={100} />
          <span className="flex flex-col text-left max-w-[250px] space-y-1 px-4">
            <h3 className="text-2xl font-bold text-white">{triggerLabel}</h3>
            <p className="text-muted-foreground text-lg normal-case">
              {children}
            </p>
          </span>
        </TooltipContent>
      </Tooltip>
    )
  }
)
AnimateCard.displayName = 'AnimateCard'

export { AnimateCard }
