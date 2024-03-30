import { ChevronRightIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center space-x-4 border rounded-lg border-foreground p-4 w-fit">
      <div
        className={cn('flex items-center space-x-4', {
          'hidden sm:flex': step !== 1,
        })}
      >
        <Avatar>
          <AvatarFallback
            className={cn('bg-muted-foreground', {
              'bg-foreground': step === 1,
            })}
          >
            <span className="text-background">1</span>
          </AvatarFallback>
        </Avatar>
        <span
          className={cn(
            'uppercase text-xl font-extrabold text-muted-foreground',
            {
              'text-foreground': step === 1,
            }
          )}
        >
          Choose PFPerson
        </span>
        <ChevronRightIcon
          className={cn('hidden sm:flex w-6 h-6 text-muted-foreground', {
            'text-foreground': step === 1,
          })}
        />
      </div>

      <div
        className={cn('flex items-center space-x-4', {
          'hidden sm:flex': step !== 2,
        })}
      >
        <Avatar>
          <AvatarFallback
            className={cn('bg-muted-foreground', {
              'bg-foreground': step === 2,
            })}
          >
            <span className="text-background">2</span>
          </AvatarFallback>
        </Avatar>
        <span
          className={cn(
            'uppercase text-xl font-extrabold text-muted-foreground',
            {
              'text-foreground': step === 2,
            }
          )}
        >
          Claim your profile
        </span>
        <ChevronRightIcon
          className={cn('hidden sm:flex w-6 h-6 text-muted-foreground', {
            'text-foreground': step === 2,
          })}
        />
      </div>

      <div
        className={cn('flex items-center space-x-4', {
          'hidden sm:flex': step !== 3,
        })}
      >
        <Avatar>
          <AvatarFallback
            className={cn('bg-muted-foreground', {
              'bg-foreground': step === 3,
            })}
          >
            <span className="text-background">3</span>
          </AvatarFallback>
        </Avatar>
        <span
          className={cn(
            'uppercase text-xl font-extrabold text-muted-foreground',
            {
              'text-foreground': step === 3,
            }
          )}
        >
          Claim PFPassport
        </span>
      </div>
    </div>
  )
}
