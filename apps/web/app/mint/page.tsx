'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { ArrowDownIcon } from '@radix-ui/react-icons'
import { TokenboundClient } from '@tokenbound/sdk'
import { Address, createWalletClient, custom, http, WalletClient } from 'viem'
import { polygon, polygonMumbai } from 'viem/chains'
import { useAccount, useSimulateContract, useWriteContract } from 'wagmi'

import { OwnedNft } from '@/types/nfts'
import { alchemy } from '@/lib/alchemy'
import * as pfpassportAbi from '@/lib/contracts/abis/pfpassport.json'
import { cn } from '@/lib/utils'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { AnimateCard } from '@/components/animate-card'
import { onTransactionSubmitted } from '@/components/etherscan-transaction'
import { NameForm } from '@/components/name-form'
import { Navbar } from '@/components/navbar'
import { PFPassport } from '@/components/pfpassport'
import { Stepper } from '@/components/stepper'

type TBAccountParams = {
  tokenContract: `0x${string}`
  tokenId: string
  chainId?: number | undefined
  salt?: number | undefined
}

enum STEPS {
  ANIMATE = 1,
  NAME = 2,
  PASSPORT = 3,
  SUCCESS = 4,
}

export default function MintPage() {
  const { address } = useAccount()
  const [nfts, setNfts] = useState<OwnedNft[]>([])
  const [selectedNft, setSelectedNft] = useState<OwnedNft | undefined>()
  const [lensHandle, setLensHandle] = useState<string>('')
  const [step, setStep] = useState(STEPS.ANIMATE)

  const walletClient = createWalletClient({
    chain: process.env.NODE_ENV === 'development' ? polygonMumbai : polygon,
    account: address,
    transport:
      process.env.NODE_ENV === 'development'
        ? http('https://polygon-mumbai-bor-rpc.publicnode.com')
        : http('https://rpc-mainnet.matic.quiknode.pro'),
  })
  const tokenboundClient = new TokenboundClient({
    walletClient: walletClient as any,
    chainId:
      process.env.NODE_ENV === 'development' ? polygonMumbai.id : polygon.id,
  })

  const [tokenAccount, setTokenAccount] = useState<string>('')

  const selectNft = (nft: OwnedNft) => {
    if (nft?.contract?.address && nft?.tokenId) {
      setSelectedNft(nft)
      const account = tokenboundClient.getAccount({
        tokenContract: nft.mint?.mintAddress as Address,
        tokenId: nft.tokenId,
      })
      setTokenAccount(account)
      onNext()
    }
  }

  useEffect(() => {
    const getNFTs = async () => {
      if (!address) {
        return
      }
      const { ownedNfts } = await alchemy.nft.getNftsForOwner(address)
      const filteredNfts = ownedNfts.filter(
        (e) => (e.image?.cachedUrl || e.image?.pngUrl) && e.mint?.mintAddress
      )
      setNfts(filteredNfts)
    }
    getNFTs()
  }, [address])

  const { data } = useSimulateContract({
    functionName: 'mint',
    args: [address],
    address: '0x21e37BF33e0c4227200fC5080af5a62DD802087F',
    abi: pfpassportAbi,
  })

  const { writeContract } = useWriteContract({
    mutation: {
      onSuccess: onTransactionSubmitted,
    },
  })

  const onBack = useCallback(() => {
    setStep((value) => value - 1)
  }, [])

  const onNext = useCallback((handle?: string) => {
    if (handle) {
      setLensHandle(handle)
    }
    setStep((value) => value + 1)
  }, [])

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.PASSPORT) {
      return onNext()
    }

    writeContract(data?.request!)
    return onNext()
  }, [step, onNext])

  const actionLabel = useMemo(() => {
    if (step === STEPS.PASSPORT) {
      return 'Mint'
    }

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    return 'Back'
  }, [step])

  let bodyContent = (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <span className="text-center font-semibold">{`${step}/3`}</span>
        <span className="text-center uppercase font-extrabold text-5xl max-w-[857px]">
          Select your PFP to
          <AnimateCard
            triggerLabel="animate"
            imageSrc="https://media.giphy.com/media/r1jbtDXIAjq92/giphy.gif"
            width={200}
            height={100}
          >
            To give life to; make alive; to quicken; as the soul animates the
            body.
          </AnimateCard>
          <br />
          into a pfperson
        </span>
      </div>

      <div className="mt-32 flex flex-1 flex-wrap justify-evenly gap-4 w-full h-full">
        {nfts.map((nft, index: number) => (
          <Avatar
            key={index}
            className={cn(
              'animate-[bounce_18s_ease-in-out_infinite] border-8 border-purple-500 w-[255px] h-[255px] cursor-pointer',
              `animate-[bounce_${index * 4}s_ease-in-out_infinite]`
            )}
            onClick={() => selectNft(nft)}
          >
            <AvatarImage src={nft.image?.cachedUrl || nft.image?.pngUrl} />
          </Avatar>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.NAME) {
    bodyContent = (
      <>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 space-y-6 p-8 sm:p-16">
          <div className="flex flex-col items-center space-y-6">
            <Avatar className="animate-pulse aniamte-ping w-auto shrink-0 sm:w-[484px] h-auto sm:h-[484px] rounded-full">
              <AvatarImage
                src={
                  selectedNft?.image?.cachedUrl || selectedNft?.image?.pngUrl
                }
                width={484}
                height={484}
                alt="PFPeople logo image"
                className="aspect-square w-auto sm:w-[484px] h-auto sm:h-[484px]"
              />
            </Avatar>
            <h3 className="uppercase font-extrabold text-xl">
              {selectedNft?.name}
            </h3>
          </div>
          <div className="flex flex-col justify-center space-y-8">
            <div className="flex flex-col space-y-4">
              <span className="text-center font-semibold">{`${step}/3`}</span>
              <span className="text-center uppercase font-extrabold text-5xl max-w-[857px]">
                your PFPerson is the star of the show and every star needs a
                <AnimateCard
                  triggerLabel="name"
                  imageSrc="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDJyNGI4bmZsMWlzM3F3eTBiem84NTljcjRqdTFhZDdoc3I2OTVkMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT5LMVDzXfBcaPIXNC/giphy.gif"
                  width={200}
                  height={100}
                >
                  {`What's in a name?`}
                  <br />
                  {'A name gives character to your PFPerson.'}
                </AnimateCard>
                <br />
              </span>
            </div>
            <NameForm
              tokenAccount={tokenAccount}
              actionLabel={actionLabel}
              secondaryActionLabel={secondaryActionLabel}
              onNext={onNext}
              onBack={onBack}
            />
          </div>
        </div>
      </>
    )
  }

  if (step === STEPS.PASSPORT) {
    bodyContent = (
      <>
        <div className="flex justify-center p-8">
          <div className="flex flex-col space-y-12 w-full">
            <PFPassport width={1830} height={1830} />
            <div className="mt-auto flex justify-center space-x-8">
              <Button
                variant="outline"
                type="button"
                className="min-w-[30%] border-primary"
                onClick={onBack}
              >
                <span className="font-extrabold italic text-primary text-2xl">
                  {secondaryActionLabel}
                </span>
              </Button>

              <Button type="submit" className="min-w-[30%]" onClick={onSubmit}>
                <span className="font-extrabold italic text-foreground text-2xl">
                  {actionLabel}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {step !== STEPS.SUCCESS ? (
        <>
          <div className="space-y-4 sm:space-y-0 flex flex-col sm:flex-row p-8 space-x-4 items-center justify-center">
            <Navbar />
            <Stepper step={step} />
          </div>
          {bodyContent}
        </>
      ) : (
        <div className="space-y-8 py-8 sm:px-8">
          <Navbar />
          <div className="block sm:flex items-center justify-center p-2 sm:p-8">
            <div className="flex flex-col space-y-12">
              <div>
                <h1 className="max-w-[712px] text-center block uppercase font-extrabold text-5xl m-auto">
                  Welcome to the PFPeople-verse,
                  <Button
                    variant="link"
                    className="uppercase font-extrabold text-5xl p-2"
                  >
                    {lensHandle}!
                  </Button>
                </h1>
              </div>

              <span className="text-center font-semibold text-xl text-muted-foreground max-w-[553px] m-auto">
                Your profile keeps track of all your onchain relationships. Go
                follow some other PFPeople!
              </span>

              <PFPassport width={430} height={430} />
              <div>
                <h1 className="max-w-[712px] text-center block uppercase font-extrabold text-3xl m-auto">
                  Here's a list of places to start your journey
                </h1>
              </div>

              <ArrowDownIcon className="w-8 h-8 m-auto text-primary" />

              <div className="flex flex-wrap space-y-4 sm:space-y-0 items-center justify-center m-auto sm:space-x-4">
                <Button variant="secondary" className="h-[96px] w-[244px]">
                  <Image
                    src="/images/hey-logo.png"
                    width={60}
                    height={60}
                    className="mr-4"
                    alt="hey.xyz logo"
                  />{' '}
                  <span className="font-extrabold text-2xl">hey.xyz</span>
                </Button>
                <Button variant="secondary" className="h-[96px] w-[244px]">
                  <Image
                    src="/images/orb-logo.png"
                    width={60}
                    height={60}
                    className="mr-4"
                    alt="orb.ac logo"
                  />
                  <span className="font-extrabold text-2xl">orb.ac</span>
                </Button>
                <Button variant="secondary" className="h-[96px] w-[244px]">
                  <Image
                    src="/images/buttrfly-logo.png"
                    width={60}
                    height={60}
                    className="mr-4"
                    alt="buttrfly logo"
                  />
                  <span className="font-extrabold text-2xl">Buttrfly</span>
                </Button>
              </div>
              <div>
                <h1 className="max-w-[712px] text-center block uppercase font-extrabold text-3xl m-auto">
                  Your profile lets you have on-chain relationships, go{' '}
                  <AnimateCard
                    triggerLabel="follow"
                    imageSrc="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG1nZDd6eHQybmE1NjZtajZpbDJ0cXZqc3RkMW81MGdvY3ZlandyYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/W04QVzelTHsNW/giphy.gif"
                    width={200}
                    height={100}
                    className="text-3xl"
                  >
                    {`A pokedex of all your on-chain relationships.`}
                  </AnimateCard>
                  <br />
                  these people.
                </h1>
              </div>

              <ArrowDownIcon className="w-8 h-8 m-auto text-primary" />

              <div className="flex flex-1 flex-wrap justify-center gap-4 w-full">
                <Avatar className="animate-[bounce_8s_ease-in-out_infinite] border-8 border-purple-500 w-[200px] h-[200px]">
                  <AvatarImage src="/images/cat.png" />
                </Avatar>

                <Avatar className="animate-[bounce_17s_ease-in-out_infinite] border-8 border-sky-500 w-[153px] h-[153px]">
                  <AvatarImage src="/images/punk.png" />
                </Avatar>

                <Avatar className="animate-[bounce_12s_ease-in-out_infinite] border-8 border-purple-500 w-[174px] h-[174px]">
                  <AvatarImage src="/images/girl.png" />
                </Avatar>

                <Avatar className="animate-[bounce_14s_ease-in-out_infinite] border-8 border-purple-500 w-[163px] h-[163px]">
                  <AvatarImage src="/images/penguin.png" />
                </Avatar>

                <Avatar className="animate-[bounce_9s_ease-in-out_infinite] border-8 border-purple-500 w-[129px] h-[129px]">
                  <AvatarImage src="/images/alligator.png" />
                </Avatar>

                <Avatar className="animate-[bounce_17s_ease-in-out_infinite] border-8 border-green-500 w-[154px] h-[154px]">
                  <AvatarImage src="/images/owl.png" />
                </Avatar>

                <Avatar className="animate-[bounce_11s_ease-in-out_infinite] border-8 border-pink-500 w-[163px] h-[163px]">
                  <AvatarImage src="/images/girl2.png" />
                </Avatar>

                <Avatar className="animate-[bounce_19s_ease-in-out_infinite] border-8 border-green-500 w-[192px] h-[192px]">
                  <AvatarImage src="/images/monkey.png" />
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
