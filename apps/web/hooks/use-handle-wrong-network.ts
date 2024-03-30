import { polygon } from 'viem/chains'
import { useConnections, useSwitchChain } from 'wagmi'

const useHandleWrongNetwork = () => {
  const activeConnection = useConnections()
  const { switchChainAsync } = useSwitchChain()

  const handleWrongNetwork = async () => {
    const activeChainId = activeConnection?.[0]?.chainId
    if (activeChainId !== polygon.id) {
      return await switchChainAsync({ chainId: polygon.id })
    }

    return
  }

  return handleWrongNetwork
}

export default useHandleWrongNetwork
