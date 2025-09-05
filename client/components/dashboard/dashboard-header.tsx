"use client"

import { motion } from 'framer-motion'
import { Search, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function DashboardHeader() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-mint via-cyan-light to-purple-light p-8 mb-6">
        <div className="relative z-10">
          <motion.h1
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl font-bold text-slate-800 mb-2"
          >
            Sell your own NFT!
          </motion.h1>
          <motion.p
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-slate-700 mb-6 max-w-md"
          >
            Create, customize, and sell your unique digital assets on the Solana blockchain.
          </motion.p>
          <div className="flex space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-slate-800 text-white hover:bg-slate-700">
                Popular NFTs
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-slate-800 text-white hover:bg-slate-700">
                Create Your First NFT
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Background NFT Preview */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-20">
          <div className="w-32 h-32 rounded-xl bg-slate-800/20 backdrop-blur-sm"></div>
        </div>
      </div>

      {/* Search and Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search artwork, collection..."
              className="pl-10 w-80 bg-card border-border"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-solana-purple to-solana-green"></div>
            <span className="text-sm font-medium">Anudeep Avula</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}