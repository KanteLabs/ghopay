import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { arbitrum, goerli, mainnet, optimism, polygon } from 'wagmi/chains';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { CustomAvatar } from '.';
import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { LensConfig, LensProvider, production } from '@lens-protocol/react';
import { LensProfileProvider } from '@/utils/store/LensProfile';
import { localStorage } from '@lens-protocol/react/web';
import { publicProvider } from 'wagmi/providers/public';
import type { AppProps } from 'next/app';

const { chains, provider, webSocketProvider } = configureChains(
  [
    // mainnet,
    polygon,
    // optimism,
    // arbitrum,
    goerli,
  ],
  [alchemyProvider({ apiKey: 'ZHPkXUR4wLVFFa5X0i9mAXznYu-ZM3K4' }), publicProvider()]
);

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: production,
  storage: localStorage(),
};

const { connectors } = getDefaultWallets({
  appName: 'GhoPay',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} showRecentTransactions theme={darkTheme()} avatar={CustomAvatar}>
        <LensProvider config={lensConfig}>
          <LensProfileProvider>
            <Component {...pageProps} />
          </LensProfileProvider>
        </LensProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;