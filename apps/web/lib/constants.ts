export const LENS_PROFILE_MUMBAI_CONTRACT_ADDRESS =
  '0x634a97C51AB50BAA273d9Fe0154b325cBe5e2191'

export const LENS_PROFILE_CONTRACT_ADDRESS =
  '0xD9591A72365bE5102397F3342f0b70195ef2BE1A'

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
