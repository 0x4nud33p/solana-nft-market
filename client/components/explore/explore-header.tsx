"use client"

import { motion } from 'framer-motion'
import { Compass, Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function ExploreHeader() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="text-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 mx-auto bg-gradient-to-br from-solana-purple to-solana-green rounded-full flex items-center justify-center"
        >
          <Compass className="w-8 h-8 text-white" />
        </motion.div>
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Explore NFTs</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing digital art, collectibles, and unique creations from artists around the world
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by category, artist, or collection..."
            className="pl-10 bg-card border-border"
          />
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </Button>
      </div>
    </motion.div>
  )
}