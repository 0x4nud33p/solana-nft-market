"use client"

import { motion } from 'framer-motion'
import { TrendingUp, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const trendingCollections = [
  {
    name: 'Solana Monkeys',
    floor: '12.5 SOL',
    volume: '1,234 SOL',
    change: '+15.2%',
    image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    name: 'DeGods',
    floor: '45.8 SOL',
    volume: '2,567 SOL',
    change: '+8.7%',
    image: 'https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    name: 'Okay Bears',
    floor: '8.2 SOL',
    volume: '987 SOL',
    change: '-3.1%',
    image: 'https://images.pexels.com/photos/7567522/pexels-photo-7567522.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
]

export function TrendingSection() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-card rounded-xl border border-border p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-solana-green" />
          Trending Collections
        </h3>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {trendingCollections.map((collection, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-accent/50 rounded-lg hover:bg-accent transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{collection.name}</h4>
                <p className="text-sm text-muted-foreground">Floor: {collection.floor}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-foreground">{collection.volume}</p>
              <p className={`text-sm flex items-center ${
                collection.change.startsWith('+') ? 'text-solana-green' : 'text-red-500'
              }`}>
                {collection.change}
                <ArrowUpRight className="w-3 h-3 ml-1" />
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}