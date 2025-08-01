import './globals.css';
import type { Metadata } from 'next';
import { SolanaProvider } from "@/components/providers/wallet-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from '@/components/ui/theme-provider';
import '@solana/wallet-adapter-react-ui/styles.css'


export const metadata: Metadata = {
  title: 'Mintly - Discover, Trade & Create Extraordinary NFTs',
  description: 'The fastest, most affordable NFT marketplace built on Solana. Trade with confidence, create with ease.',
  keywords: 'Solana, NFT, marketplace, blockchain, digital art, crypto, trading, minting',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <QueryProvider>
          <SolanaProvider> <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange={false}
          >
            {children}
          </ThemeProvider>
          </SolanaProvider>
        </QueryProvider>
      </body>
    </html>
  );
}