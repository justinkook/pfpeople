import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { ethers } from 'ethers'

import { Pfpassport } from './contracts/types'

export const mintPFPassportWithMintingFee = async (
  pfPassport: Pfpassport, // TypeChain type for PFPassport contract generated from ABI
  admin: SignerWithAddress,
  minter: SignerWithAddress,
  to: string,
  tokenURI: string
) => {
  const { v, r, s } = await ERC721_generateSignature(
    pfPassport,
    admin,
    minter.address
  )

  /* 
     function mint(
      address to,
      bytes32 r,
      bytes32 s,
      uint8 v,
      string memory _tokenURI
     ) external payable
    */
  const txn = await pfPassport.connect(minter).mint(to, r, s, v, tokenURI, {
    value: await pfPassport.MINT_FEE(),
  })
  const receipt = await txn.wait()
  console.log('hash: ', receipt?.transactionHash)
}

/**
 * Generate and sign EIP712 typed data for ERC721Token contract
 * @param erc721 PFPassport contract used
 * @param trustedAddress trustedAddress signer
 * @param to address to mint token to
 * @returns EIP712 signature from trustedAddress
 */
export const ERC721_generateSignature = async (
  erc721: Pfpassport,
  trustedAddress: SignerWithAddress,
  to: string
) => {
  const { domain, types, value } = getEIP712TypedData({
    to,
    contractAddress: erc721.address,
    chainId: 80001,
    domainName: await erc721.name(),
    domainVersion: '1.0',
  })
  const rawSignature: string = await trustedAddress._signTypedData(
    domain,
    types,
    value
  )
  return ethers.utils.splitSignature(rawSignature)
}

export const getEIP712TypedData = ({
  to,
  contractAddress,
  chainId,
  domainName,
  domainVersion,
}: {
  to: string
  contractAddress: string
  chainId: number
  domainName: string
  domainVersion: string
}) => {
  const domain = {
    name: domainName,
    version: domainVersion,
    chainId,
    verifyingContract: contractAddress,
  }
  const types = {
    Mint: [{ name: 'to', type: 'address' }],
  }
  const value = {
    to,
  }

  return { domain, types, value }
}
