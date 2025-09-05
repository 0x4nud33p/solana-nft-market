"use client"

import { motion } from 'framer-motion'
import { Search, TrendingUp, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function MarketHeader() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">NFT Marketplace</h1>
        <p className="text-muted-foreground">Discover, collect, and trade extraordinary NFTs</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search collections, NFTs..."
            className="pl-10 bg-card border-border"
          />
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </Button>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4 text-solana-green" />
            <span className="text-sm text-muted-foreground">Total Volume</span>
          </div>
          <div className="text-2xl font-bold text-foreground">2.5M SOL</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-sm text-muted-foreground mb-2">Floor Price</div>
          <div className="text-2xl font-bold text-foreground">0.5 SOL</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-sm text-muted-foreground mb-2">Active Listings</div>
          <div className="text-2xl font-bold text-foreground">12,543</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-sm text-muted-foreground mb-2">24h Sales</div>
          <div className="text-2xl font-bold text-foreground">1,234</div>
        </div>
      </div>
    </motion.div>
  )
}