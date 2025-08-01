import './globals.css';
import type { Metadata } from 'next';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { ThemeProvider } from '@/components/ui/theme-provider';

export const metadata: Metadata = {
  title: 'Mintly - Discover, Trade & Create Extraordinary NFTs',
  description: 'The fastest, most affordable NFT marketplace built on Solana. Trade with confidence, create with ease.',
  keywords: 'Solana, NFT, marketplace, blockchain, digital art, crypto, trading, minting',
};

const network = WalletAdapterNetwork.Devnet;
const endpoint = clusterApiUrl(network);

const wallets = [new PhantomWalletAdapter()];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider> <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              disableTransitionOnChange={false}
            >
              {children}
            </ThemeProvider></WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}