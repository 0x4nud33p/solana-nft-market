"use client"

import { motion } from 'framer-motion'
import { MoreHorizontal, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

const nftData = [
  {
    id: 1,
    name: 'Blockchain Coders.',
    owner: '9yTY...qGnF',
    price: '71nk...ZKKz',
    image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'Listed'
  },
  {
    id: 2,
    name: 'Final Code',
    owner: '9yTY...qGnF',
    price: 'DHcs...tvV3',
    image: 'https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'Listed'
  },
  {
    id: 3,
    name: 'SolPunk #001',
    owner: '9yTY...qGnF',
    price: 'Ghq3...Wjn7',
    image: 'https://images.pexels.com/photos/7567522/pexels-photo-7567522.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'Listed'
  },
    {
    id: 4,
    name: 'Blockchain Coders.',
    owner: '9yTY...qGnF',
    price: '71nk...ZKKz',
    image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'Listed'
  },
  {
    id: 5,
    name: 'Final Code',
    owner: '9yTY...qGnF',
    price: 'DHcs...tvV3',
    image: 'https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'Listed'
  },
  {
    id: 6,
    name: 'SolPunk #001',
    owner: '9yTY...qGnF',
    price: 'Ghq3...Wjn7',
    image: 'https://images.pexels.com/photos/7567522/pexels-photo-7567522.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'Listed'
  }
]

export function NFTGrid() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {nftData.map((nft, index) => (
          <motion.div
            key={nft.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            {/* NFT Image */}
            <div className="relative aspect-square overflow-hidden">
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="secondary" size="icon" className="w-8 h-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
              <div className="absolute top-3 left-3">
                <div className="flex items-center space-x-1 text-xs text-white bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                  <div className="w-4 h-4 rounded-sm bg-gradient-to-r from-solana-purple to-solana-green flex items-center justify-center">
                    <span className="text-white text-xs">△</span>
                  </div>
                  <span>Own by:</span>
                </div>
              </div>
            </div>

            {/* NFT Info */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-foreground mb-1">{nft.name}</h3>
                <p className="text-sm text-muted-foreground">{nft.owner}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-muted-foreground">Price: </span>
                  <span className="font-medium text-foreground">{nft.price}</span>
                </div>
                <Button
                  size="sm"
                  className={cn(
                    "text-xs px-3 py-1",
                    nft.status === 'Listed' 
                      ? "bg-slate-blue/20 text-slate-blue hover:bg-slate-blue/30" 
                      : "bg-mint/20 text-slate-800 hover:bg-mint/30"
                  )}
                >
                  {nft.status}
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}