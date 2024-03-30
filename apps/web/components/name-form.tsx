'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useGenerateLensApiRelayAddressQuery,
  useHandleToAddressLazyQuery,
} from '@pfpeople/lens'
import { ArrowBottomRightIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import { useAccount, useWriteContract } from 'wagmi'
import * as z from 'zod'

import {
  COMMON_REGEX,
  LENS_NAMESPACE_PREFIX,
  LENS_PROFILE_CONTRACT_ADDRESS,
  LENS_PROFILE_MUMBAI_CONTRACT_ADDRESS,
  ZERO_ADDRESS,
} from '@/lib/constants'
import * as HANDLE_CREATOR_ABI from '@/lib/contracts/abis/handle-creator.json'
import { useDebounce } from '@/hooks/use-debounce'
import useHandleWrongNetwork from '@/hooks/use-handle-wrong-network'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { toast } from './ui/use-toast'

type NameFormProps = {
  tokenAccount: string
  actionLabel: string
  secondaryActionLabel: string
  onNext: () => void
  onBack: () => void
}

const FormSchema = z.object({
  handle: z
    .string()
    .min(5, { message: 'Handle should be at least 5 characters' })
    .max(26, { message: 'Handle should not exceed 26 characters' })
    .regex(COMMON_REGEX.HANDLE, {
      message:
        'Handle must start with a letter/number, only _ allowed in between',
    }),
})

export const NameForm: React.FC<NameFormProps> = ({
  tokenAccount,
  actionLabel,
  secondaryActionLabel,
  onNext,
  onBack,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      handle: '',
    },
    mode: 'onBlur',
  })

  const [creating, setCreating] = useState(false)
  const [isHandleAvailable, setIsHandleAvailable] = useState(false)
  const handleWrongNetwork = useHandleWrongNetwork()

  const { address } = useAccount()
  const handle = form.watch('handle')?.toLowerCase()
  const debouncedValue = useDebounce<string>(handle, 300)

  const { data } = useGenerateLensApiRelayAddressQuery({
    fetchPolicy: 'no-cache',
  })
  const delegatedExecutor = data?.generateLensAPIRelayAddress

  const [checkAvailability, { loading: checkingAvailability }] =
    useHandleToAddressLazyQuery({
      fetchPolicy: 'no-cache',
    })

  const onError = (error: Error) => {
    setCreating(false)
    toast({
      title: 'Error',
      description: error?.message,
      variant: 'destructive',
    })
  }

  const { writeContractAsync, data: txnHash } = useWriteContract({
    mutation: {
      onError,
    },
  })

  const onSearchDebounce = async () => {
    if (handle?.trim().length) {
      const { data } = await checkAvailability({
        variables: {
          request: {
            handle: `${LENS_NAMESPACE_PREFIX}${handle}`,
          },
        },
      })
      if (data?.handleToAddress) {
        return setIsHandleAvailable(false)
      }
      setIsHandleAvailable(true)
    }
  }

  useEffect(() => {
    onSearchDebounce()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!isHandleAvailable) {
      return toast({
        title: 'Handle is taken',
        description: 'Please choose a different handle',
        variant: 'destructive',
      })
    }

    setCreating(true)
    await handleWrongNetwork()

    try {
      if (!delegatedExecutor) {
        setCreating(false)
        return toast({
          title: 'Delegate not found',
          variant: 'destructive',
        })
      }
      await writeContractAsync({
        abi: HANDLE_CREATOR_ABI,
        address:
          process.env.NODE_ENV === 'production'
            ? LENS_PROFILE_CONTRACT_ADDRESS
            : LENS_PROFILE_MUMBAI_CONTRACT_ADDRESS,
        args: [[tokenAccount, ZERO_ADDRESS, '0x'], handle, [delegatedExecutor]],
        functionName: 'createProfileWithHandleUsingCredits',
      })

      setCreating(false)
      onNext()
    } catch {
      setCreating(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <FormField
          control={form.control}
          name="handle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-lg">
                Your Lens Handle
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="pfpeople"
                  {...field}
                  className="w-full bg-muted h-[60px]"
                />
              </FormControl>
              <FormDescription className="flex space-x-2">
                <ArrowBottomRightIcon />
                your Lens handle.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button
            variant="outline"
            type="button"
            className="w-[45%] border-primary"
            onClick={onBack}
          >
            <span className="font-extrabold italic text-primary text-2xl">
              {secondaryActionLabel}
            </span>
          </Button>

          <Button type="submit" className="w-[45%]">
            <span className="font-extrabold italic text-foreground text-2xl">
              {actionLabel}
            </span>
          </Button>
        </div>
      </form>
    </Form>
  )
}
