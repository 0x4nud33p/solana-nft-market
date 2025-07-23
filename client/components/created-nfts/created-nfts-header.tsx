"use client"

import { motion } from 'framer-motion'
import { Plus, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CreatedNFTsHeader() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-between"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Created NFTs</h1>
        <p className="text-muted-foreground">Manage and track your NFT creations</p>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button variant="outline" className="flex items-center space-x-2">
          <Upload className="w-4 h-4" />
          <span>Import</span>
        </Button>
        <Button className="bg-solana-purple hover:bg-solana-purple/90 flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Create NFT</span>
        </Button>
      </div>
    </motion.div>
  )
}