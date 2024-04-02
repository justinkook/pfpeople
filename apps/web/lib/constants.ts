export const LENS_PROFILE_MUMBAI_CONTRACT_ADDRESS =
  '0x65dCba4Df48f71A8b7Cc0F7ab4E5144208Cf7fBf'

export const LENS_PROFILE_CONTRACT_ADDRESS =
  '0xbCB51B779a770a9a21136a5AcB183685E01d2388'

export const LENS_DELEGATE_SIGNLESS_ADDRESS =
  '0xC9FA5F824530b0DB3Df97820ded190F849b9bc0d'

export const PFPASSPORT_TESTNET_CONTRACT_ADDRESS =
  '0x09508E76DCF6BF1448f91BF902cFaDCbF36F1F0E'

export const PFPASSPORT_TOKEN_URI =
  'https://bafkreigx4kyelbk7rh2vkcpit66mgdrkflvbmsktstoooi7n2tre26pvfu.ipfs.nftstorage.link/'

export const COMMON_REGEX = {
  ZORA: /https:\/\/(?:testnet\.)?zora\.co\/collect\/(eth|oeth|base|zora|gor|ogor|basegor|zgor):(0x[\dA-Fa-f]{40})((?:\/(\d+))?|$)/,
  URL: /\b(http|https):\/\/([\p{L}\p{N}_-]+(?:(?:\.[\p{L}\p{N}_-]+)+))([\p{L}\p{N}_.,@?^=%&:\/~+#-]*[\p{L}\p{N}_@?^=%&\/~+#-])/gu,
  MENTION_MATCHER_REGEX: /(@[a-zA-Z0-9-_.]+(?:\/[a-zA-Z0-9-_.]+)?)/,
  HANDLE: /^[\dA-Za-z]\w{4,25}$/g,
  TAPE_WATCH:
    /^https?:\/\/tape\.xyz\/watch\/([\dA-Za-z-]+)(\?si=[\dA-Za-z]+)?$/,
  YOUTUBE_WATCH:
    /^https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)[\w-]+(?:\?.*)?$/,
  VIMEO_WATCH: /^https?:\/\/(?:www\.)?vimeo\.com\/[\d]+(?:\?.*)?$/,
}

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const LENS_NAMESPACE_PREFIX =
  process.env.NODE_ENV === 'production' ? 'lens/' : 'test/'
