export type OwnedNft = {
  acquiredAt?: {
    blockNumber?: number
    blockTimestamp?: string
  }
  balance?: string
  collection?: {
    bannerImageUrl?: string
    externalUrl?: string
    name?: string
    slug?: string
  }
  contract?: {
    address?: string
    contractDeployer?: string
    deployedBlockNumber?: number
    isSpam?: boolean
    name?: string
    openSeaMetadata?: {
      bannerImageUrl?: string
      collectionName?: string
      collectionSlug?: string
      description?: string
      discordUrl?: string
      floorPrice?: number
      imageUrl?: string
      lastIngestedAt?: string
      safelistRequestStatus?: string
      twitterUsername?: string
    }
    spamClassification?: any[]
    symbol?: string
    tokenType?: string
    tokenSupply?: string
  }
  description?: string
  image?: {
    cachedUrl?: string
    contentType?: string
    originalUrl?: string
    pngUrl?: string
    size?: number
    thumbnailUrl?: string
  }
  mint?: {
    blockNumber?: number
    mintAddress?: string
    timestamp?: string
    transactionHash?: string
  }
  name?: string
  owners?: string[]
  raw?: {
    error?: string
    metadata?: any
    tokenUri?: string
  }
  timeLastUpdated?: string
  tokenId?: string
  tokenType?: string
  tokenUri?: string
}

export type OwnedNfts = {
  ownedNfts: OwnedNft[]
  totalCount: number
  blockHash: string
}
