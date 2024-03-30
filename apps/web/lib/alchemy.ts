import { Alchemy, Network } from 'alchemy-sdk'

const config = {
  apiKey: process.env.ALCHEMY_API_KEY!,
  network: Network.ETH_MAINNET,
  // network: Network.MATIC_MAINNET,
}

export const alchemy = new Alchemy(config)
