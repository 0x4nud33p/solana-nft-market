import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ui/theme-provider';

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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}