"use client"

import { motion } from 'framer-motion'
import { Zap, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

const newDrops = [
  {
    name: 'Cyber Punks 2024',
    artist: 'CyberArt Studio',
    dropTime: '2 hours',
    price: '0.5 SOL',
    image: 'https://images.pexels.com/photos/7567486/pexels-photo-7567486.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    name: 'Abstract Minds',
    artist: 'Digital Dreams',
    dropTime: '6 hours',
    price: '0.8 SOL',
    image: 'https://images.pexels.com/photos/7567521/pexels-photo-7567521.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    name: 'Neon Nights',
    artist: 'Retro Wave',
    dropTime: '1 day',
    price: '1.2 SOL',
    image: 'https://images.pexels.com/photos/7567532/pexels-photo-7567532.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
]

export function NewDrops() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground flex items-center">
          <Zap className="w-6 h-6 mr-2 text-solana-blue" />
          New Drops
        </h2>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {newDrops.map((drop, index) => (
          <motion.div
            key={index}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl border border-border p-4 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={drop.image}
                  alt={drop.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm">{drop.name}</h3>
                <p className="text-xs text-muted-foreground">by {drop.artist}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Drops in {drop.dropTime}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{drop.price}</p>
                <Button size="sm" className="mt-1 bg-solana-blue hover:bg-solana-blue/90">
                  Notify Me
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}