import { useConnections, useSwitchChain } from 'wagmi'

import { POLYGON_CHAIN_ID } from '@/lib/constants'

const useHandleWrongNetwork = () => {
  const activeConnection = useConnections()
  const { switchChainAsync } = useSwitchChain()

  const handleWrongNetwork = async () => {
    const activeChainId = activeConnection?.[0]?.chainId
    if (activeChainId !== POLYGON_CHAIN_ID) {
      return await switchChainAsync({ chainId: POLYGON_CHAIN_ID })
    }

    return
  }

  return handleWrongNetwork
}

export default useHandleWrongNetwork
