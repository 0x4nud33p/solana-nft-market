"use client"

import { motion } from 'framer-motion'
import { Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const featuredCollections = [
  {
    name: 'Solana Monkeys',
    description: 'A collection of 10,000 unique monkeys living on Solana',
    floor: '12.5 SOL',
    items: '10,000',
    image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'DeGods',
    description: 'The most exclusive NFT collection on Solana',
    floor: '45.8 SOL',
    items: '10,000',
    image: 'https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Okay Bears',
    description: 'Just some bears that are okay living on the blockchain',
    floor: '8.2 SOL',
    items: '10,000',
    image: 'https://images.pexels.com/photos/7567522/pexels-photo-7567522.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
]

export function FeaturedCollections() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground flex items-center">
          <Star className="w-6 h-6 mr-2 text-solana-green" />
          Featured Collections
        </h2>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {featuredCollections.map((collection, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl border border-border p-4 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground mb-1">{collection.name}</h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {collection.description}
                </p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>Floor: {collection.floor}</span>
                  <span>Items: {collection.items}</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}