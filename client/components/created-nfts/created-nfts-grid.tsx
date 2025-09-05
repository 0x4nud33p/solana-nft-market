"use client"

import { motion } from 'framer-motion'
import { MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const createdNFTs = [
  {
    name: 'My First NFT',
    collection: 'Personal Collection',
    status: 'Listed',
    price: '1.2 SOL',
    views: 234,
    likes: 45,
    image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Digital Art #001',
    collection: 'Art Series',
    status: 'Draft',
    price: 'Not Listed',
    views: 0,
    likes: 0,
    image: 'https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Abstract Mind',
    collection: 'Abstract Collection',
    status: 'Sold',
    price: '2.5 SOL',
    views: 567,
    likes: 89,
    image: 'https://images.pexels.com/photos/7567522/pexels-photo-7567522.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    name: 'Cyber Punk #123',
    collection: 'Cyber Series',
    status: 'Listed',
    price: '3.8 SOL',
    views: 123,
    likes: 67,
    image: 'https://images.pexels.com/photos/7567486/pexels-photo-7567486.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
]

export function CreatedNFTsGrid() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Your NFTs</h2>
        <div className="text-sm text-muted-foreground">
          {createdNFTs.length} items
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {createdNFTs.map((nft, index) => (
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
                <Badge variant={
                  nft.status === 'Listed' ? 'default' :
                  nft.status === 'Sold' ? 'secondary' : 'outline'
                }>
                  {nft.status}
                </Badge>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-foreground mb-1">{nft.name}</h3>
                <p className="text-sm text-muted-foreground">{nft.collection}</p>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-muted-foreground">Price</p>
                  <p className="font-medium text-foreground">{nft.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground">Views</p>
                  <p className="font-medium text-foreground">{nft.views}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}