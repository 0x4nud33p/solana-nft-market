"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X, Sun, Moon, ArrowRight } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { Coins } from 'lucide-react'

const navigationItems = [
  {
    name: 'Marketplace',
    href: '/market',
    hasDropdown: true,
    items: [
      { name: 'Browse NFTs', href: '/explore' },
      { name: 'Top Collections', href: '/market' },
      { name: 'New Drops', href: '/market' },
    ]
  },
  {
    name: 'Create',
    href: '/created-nfts',
    hasDropdown: true,
    items: [
      { name: 'Mint NFT', href: '/dashboard' },
      { name: 'Create Collection', href: '/dashboard' },
      { name: 'Launchpad', href: '/dashboard' },
    ]
  },
  {
    name: 'Analytics',
    href: '/dashboard',
    hasDropdown: true,
    items: [
      { name: 'Market Stats', href: '/explore' },
      { name: 'Portfolio Tracker', href: '/explore' },
      { name: 'Price History', href: '/explore' },
    ]
  },
  {
    name: 'Community',
    href: '#',
    hasDropdown: false,
  },
]

export function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false);

  const { wallet, publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  const handleClick = () => {
    if (!publicKey) setVisible(true);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-50"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-bright to-cyan-light">
              <Coins className="h-6 w-6 text-white dark:text-slate-800" />
            </div>
            <Link href={"/"} className="text-xl font-bold text-foreground">Mintly</Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && isMounted && (
                    <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                  )}
                </Link>
                {/* Dropdown */}
                <AnimatePresence>
                  {item.hasDropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-2 w-48 rounded-xl bg-card/95 backdrop-blur-md border border-border shadow-lg"
                    >
                      <div className="p-2">
                        {item.items?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex lg:items-center lg:space-x-4"
          >
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link
              href="#"
              className="inline-flex items-center space-x-2 rounded-xl bg-cyan-bright px-4 py-2 text-sm font-semibold text-slate-800 transition-all hover:bg-cyan-light hover:scale-105"
            >
              <span>Connect Wallet</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-muted-foreground"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-card/95 backdrop-blur-md"
          >
            <div className="px-6 py-4 space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border">
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setVisible(true); 
                  }}
                  className="block text-sm font-medium text-muted-foreground hover:text-foreground mb-2"
                >
                  Connect Wallet
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center space-x-2 rounded-xl solana-gradient px-4 py-2 text-sm font-semibold text-white"
                >
                  <span>Start Trading</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}