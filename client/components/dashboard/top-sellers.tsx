"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const topSellersData = [
  {
    id: 1,
    name: 'Blockchain Coders.',
    collection: '71nk...ZKKz',
    image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=100',
    action: 'View'
  },
  {
    id: 2,
    name: 'Final Code',
    collection: 'DHcs...tvV3',
    image: 'https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg?auto=compress&cs=tinysrgb&w=100',
    action: 'View'
  },
  {
    id: 3,
    name: 'SolPunk #001',
    collection: 'Ghq3...Wjn7',
    image: 'https://images.pexels.com/photos/7567522/pexels-photo-7567522.jpeg?auto=compress&cs=tinysrgb&w=100',
    action: 'View'
  },
  {
    id: 4,
    name: 'Web3 NFT',
    collection: '921G...4sDY',
    image: 'https://images.pexels.com/photos/7567486/pexels-photo-7567486.jpeg?auto=compress&cs=tinysrgb&w=100',
    action: 'View'
  }
]

const topSellers = [
  {
    id: 1,
    name: '9yTY..qGnF',
    role: 'creator',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    action: 'Profile'
  }
]

export function TopSellers() {
  return (
    <div className="space-y-6">
      {/* Recent NFTs */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Recent Activity</h3>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            View all
          </Button>
        </div>
        
        <div className="space-y-4">
          {topSellersData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground text-sm truncate">
                  {item.name}
                </h4>
                <p className="text-xs text-muted-foreground truncate">
                  {item.collection}
                </p>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">
                {item.action}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Top Sellers */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Top Sellers</h3>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            See all
          </Button>
        </div>
        
        <div className="space-y-4">
          {topSellers.map((seller, index) => (
            <motion.div
              key={seller.id}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={seller.avatar}
                    alt={seller.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-solana-green rounded-full border-2 border-card"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground text-sm">
                  {seller.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {seller.role}
                </p>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">
                {seller.action}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}