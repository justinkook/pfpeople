import Image from 'next/image'

import { cn } from '@/lib/utils'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type PFPassportProps = {
  width: number
  height: number
}

export const PFPassport = ({ width, height }: PFPassportProps) => {
  return (
    <div
      className="w-full h-full flex justify-center items-center"
      style={{
        fill: 'radial-gradient(54.43% 69.35% at 48.7% 23.59%, rgba(68, 16, 9, 0.55) 0%, rgba(21, 6, 4, 0.00) 100%), radial-gradient(112.82% 143.75% at 50.02% 37.6%, rgba(33, 7, 4, 0.00) 0%, #210704 100%)',
        strokeWidth: '4px',
        stroke: '#37080A',
        filter: 'drop-shadow(0px 0px 60px rgba(0, 0, 0, 0.58))',
      }}
    >
      <Image
        src="/images/pfpassport.jpg"
        alt="pfpassport image"
        width={width}
        height={height}
        className="w-full h-auto shadow-sm drop-shadow-lg"
      />
      {/* <Card
        className={cn('p-8 bg-transparent border-4 border-primary', className)}
      >
        <CardContent className="flex pt-8 space-x-6 items-center">
          <Avatar className="w-[430px] h-[430px] border-8 border-pink-500">
            <AvatarImage
              src="/images/girl2.png"
              width={430}
              height={430}
              alt="PFPeople logo image"
              className="aspect-square"
            />
          </Avatar>
          <div className="flex flex-col space-y-6">
            <span className="uppercase text-6xl font-extrabold">
              Mira Mathers
            </span>
            <Separator className="bg-[#37080A] h-1" />
            <div className="flex items-center">
              <p className="text-sm font-medium leading-none text-muted-foreground">
                Collection
              </p>
              <div className="ml-auto font-medium">Shinsei Galverse</div>
            </div>
            <div className="flex items-center">
              <p className="text-sm font-medium leading-none text-muted-foreground">
                Username
              </p>
              <div className="ml-auto font-medium">@mira.lens</div>
            </div>
            <div className="flex items-center">
              <p className="text-sm font-medium leading-none text-muted-foreground">
                Date of PFPhood
              </p>
              <div className="ml-auto font-medium">12/02/2024</div>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  )
}
