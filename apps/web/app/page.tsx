'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ConnectKitButton, useIsMounted } from 'connectkit'
import { useAccount } from 'wagmi'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export default function Home() {
  const isMounted = useIsMounted()
  const { address } = useAccount()

  return (
    <main className="flex flex-col items-center justify-center p-2">
      <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 items-center sm:space-x-8 p-8">
        <Image
          src="/images/pfplogo.svg"
          width={200}
          height={60}
          alt="PFPeople logo image"
        />

        <h1 className="block uppercase font-extrabold text-3xl w-[290px]">
          Bring your pfp to life
          <Button
            variant="link"
            className="uppercase font-extrabold text-3xl p-2"
          >
            on chain
          </Button>
        </h1>

        {!isMounted && <Skeleton className="w-[211px] h-[56px] bg-primary" />}
        <ConnectKitButton.Custom>
          {({ isConnected, show, truncatedAddress, ensName }) => {
            return (
              <Button
                onClick={show}
                className="fixed bottom-20 sm:relative sm:top-0 mx-auto w-[211px] h-[56px]"
              >
                <span className="italic uppercase text-xl font-extrabold">
                  {isConnected ? ensName ?? truncatedAddress : 'Connect Wallet'}
                </span>
              </Button>
            )
          }}
        </ConnectKitButton.Custom>
      </div>

      <iframe
        width="971"
        height="547"
        src="https://www.youtube.com/embed/LUJnlytAISQ?si=jpl4otDAQPttfVun"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      {address && (
        <Button className="italic uppercase text-xl font-extrabold">
          <Link href="/mint">Enter</Link>
        </Button>
      )}

      <div className="-z-50 overflow-hidden bg-blend-darken opacity-35">
        <Avatar className="animate-[bounce_7s_ease-in-out_infinite] absolute top-20 -left-10 border-8 border-purple-500 w-[200px] h-[200px]">
          <AvatarImage src="/images/cat.png" />
        </Avatar>

        <Avatar className="animate-[bounce_10s_ease-in-out_infinite] absolute top-80 left-20 border-8 border-sky-500 w-[153px] h-[153px]">
          <AvatarImage src="/images/punk.png" />
        </Avatar>

        <Avatar className="animate-[bounce_8s_ease-in-out_infinite] absolute bottom-20 -left-10 border-8 border-purple-500 w-[174px] h-[174px]">
          <AvatarImage src="/images/girl.png" />
        </Avatar>

        <Avatar className="animate-[bounce_13s_ease-in-out_infinite] absolute bottom-0 left-40 border-8 border-purple-500 w-[163px] h-[163px]">
          <AvatarImage src="/images/penguin.png" />
        </Avatar>

        <Avatar className="animate-[bounce_5s_ease-in-out_infinite] absolute top-20 right-0 border-8 border-purple-500 w-[129px] h-[129px]">
          <AvatarImage src="/images/alligator.png" />
        </Avatar>

        <Avatar className="animate-[bounce_19s_ease-in-out_infinite] absolute top-40 right-40 border-8 border-green-500 w-[154px] h-[154px]">
          <AvatarImage src="/images/owl.png" />
        </Avatar>

        <Avatar className="animate-[bounce_7s_ease-in-out_infinite] absolute bottom-60 right-0 border-8 border-pink-500 w-[163px] h-[163px]">
          <AvatarImage src="/images/girl2.png" />
        </Avatar>

        <Avatar className="animate-[bounce_15s_ease-in-out_infinite] absolute bottom-0 right-20 border-8 border-green-500 w-[192px] h-[192px]">
          <AvatarImage src="/images/monkey.png" />
        </Avatar>
      </div>
    </main>
  )
}
