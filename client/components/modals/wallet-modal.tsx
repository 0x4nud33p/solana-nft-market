"use client"

import { motion } from 'framer-motion'
import { X, Wallet, Copy, ExternalLink, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-md mx-4 bg-card rounded-2xl border border-border shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground flex items-center">
            <Wallet className="w-6 h-6 mr-2 text-solana-green" />
            Wallet
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-solana-purple to-solana-green rounded-full flex items-center justify-center">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Connect Your Wallet</h3>
              <p className="text-sm text-muted-foreground">Choose your preferred Solana wallet</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button className="w-full justify-start bg-[#512DA8] hover:bg-[#512DA8]/90 text-white">
              <div className="w-6 h-6 mr-3 bg-white rounded-full"></div>
              Phantom
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <div className="w-6 h-6 mr-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              Solflare
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <div className="w-6 h-6 mr-3 bg-black rounded-full"></div>
              Backpack
            </Button>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              By connecting your wallet, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}