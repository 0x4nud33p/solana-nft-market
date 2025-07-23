"use client"

import { motion } from 'framer-motion'
import { X, Clock, Rocket, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ComingSoonModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ComingSoonModal({ isOpen, onClose }: ComingSoonModalProps) {
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
            <Clock className="w-6 h-6 mr-2 text-solana-blue" />
            Coming Soon
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 text-center space-y-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto bg-gradient-to-br from-solana-purple to-solana-green rounded-full flex items-center justify-center"
          >
            <Rocket className="w-8 h-8 text-white" />
          </motion.div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">Exciting Features Coming!</h3>
            <p className="text-muted-foreground">
              We're working on amazing new features that will revolutionize your NFT experience.
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-left space-y-2">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-solana-green" />
                <span className="text-sm text-foreground">Advanced Analytics Dashboard</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-solana-green" />
                <span className="text-sm text-foreground">AI-Powered NFT Recommendations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-solana-green" />
                <span className="text-sm text-foreground">Cross-Chain Trading</span>
              </div>
            </div>

            <div className="space-y-2">
              <Input placeholder="Enter your email for updates" />
              <Button className="w-full bg-solana-purple hover:bg-solana-purple/90">
                Notify Me
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}