import { Hash } from 'viem'
import { useAccount } from 'wagmi'

import { toast } from '@/components/ui/use-toast'

export function EtherscanTransaction({
  hash,
  message,
}: {
  hash?: Hash
  message: string
}) {
  const { chain } = useAccount()
  const etherscan = chain?.blockExplorers?.default
  return (
    <span>
      {etherscan && (
        <a
          href={`${etherscan.url}/tx/${hash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {message}
        </a>
      )}
    </span>
  )
}

export function onTransactionSubmitted(hash: Hash) {
  toast({
    title: 'Transaction Submitted',
    description: (
      <EtherscanTransaction hash={hash} message={'View transaction'} />
    ),
  })
}
