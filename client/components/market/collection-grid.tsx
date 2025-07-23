"use client"

import { motion } from 'framer-motion'
import { Heart, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'

const nftCollections = [
  {
    name: 'Blockchain Coders #001',
    collection: 'Blockchain Coders',
    price: '2.5 SOL',
    image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: 234
  },
  {
    name: 'Final Code #042',
    collection: 'Final Code',
    price: '1.8 SOL',
    image: 'https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: 156
  },
  {
    name: 'SolPunk #001',
    collection: 'SolPunk',
    price: '3.2 SOL',
    image: 'https://images.pexels.com/photos/7567522/pexels-photo-7567522.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: 89
  },
  {
    name: 'Web3 NFT #123',
    collection: 'Web3 Collection',
    price: '0.9 SOL',
    image: 'https://images.pexels.com/photos/7567486/pexels-photo-7567486.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: 67
  },
  {
    name: 'Digital Art #456',
    collection: 'Digital Arts',
    price: '4.1 SOL',
    image: 'https://images.pexels.com/photos/7567521/pexels-photo-7567521.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: 312
  },
  {
    name: 'Crypto Punk #789',
    collection: 'Crypto Punks',
    price: '5.5 SOL',
    image: 'https://images.pexels.com/photos/7567532/pexels-photo-7567532.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: 445
  }
]

export function CollectionGrid() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">All NFTs</h3>
        <div className="text-sm text-muted-foreground">
          {nftCollections.length} items
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nftCollections.map((nft, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
          >
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
                <Button variant="secondary" size="icon" className="w-8 h-8">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <h4 className="font-semibold text-foreground mb-1">{nft.name}</h4>
                <p className="text-sm text-muted-foreground">{nft.collection}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="font-semibold text-foreground">{nft.price}</p>
                </div>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Heart className="w-4 h-4" />
                  <span>{nft.likes}</span>
                </div>
              </div>

              <Button className="w-full bg-solana-purple hover:bg-solana-purple/90">
                Buy Now
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}