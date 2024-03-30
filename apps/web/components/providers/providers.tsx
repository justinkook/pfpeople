'use client'

import { apolloClient, ApolloProvider } from '@pfpeople/lens/apollo'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { createConfig, WagmiProvider } from 'wagmi'
import {
  arbitrum,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
} from 'wagmi/chains'

import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/components/providers/theme-provider'

export const wagmiConfig = createConfig(
  getDefaultConfig({
    chains: [mainnet, polygon, optimism, arbitrum, polygonMumbai],
    // Required API Keys
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID!,

    // Required
    appName: 'PFPeople',

    // Optional
    appDescription: 'PFPeople',
    appUrl: 'https://pfpeople.studio', // your app's url
    appIcon: 'https://pfpeople.studio/pfplogo.svg', // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
)

const queryClient = new QueryClient()

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <WagmiProvider config={wagmiConfig}>
        <ApolloProvider client={apolloClient()}>
          <QueryClientProvider client={queryClient}>
            <ConnectKitProvider>
              <TooltipProvider>
                {children}
                <Toaster />
              </TooltipProvider>
            </ConnectKitProvider>
          </QueryClientProvider>
        </ApolloProvider>
      </WagmiProvider>
    </ThemeProvider>
  )
}
