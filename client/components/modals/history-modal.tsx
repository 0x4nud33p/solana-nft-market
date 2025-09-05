"use client"

import { motion } from 'framer-motion'
import { X, History, ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HistoryModalProps {
  isOpen: boolean
  onClose: () => void
}

const transactions = [
  {
    type: 'buy',
    nft: 'Blockchain Coders #001',
    price: '2.5 SOL',
    date: '2 hours ago',
    status: 'completed'
  },
  {
    type: 'sell',
    nft: 'Final Code #042',
    price: '1.8 SOL',
    date: '1 day ago',
    status: 'completed'
  },
  {
    type: 'mint',
    nft: 'SolPunk #001',
    price: '0.1 SOL',
    date: '3 days ago',
    status: 'completed'
  },
]

export function HistoryModal({ isOpen, onClose }: HistoryModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-2xl mx-4 bg-card rounded-2xl border border-border shadow-2xl max-h-[80vh] overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground flex items-center">
            <History className="w-6 h-6 mr-2 text-slate-blue" />
            Transaction History
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="space-y-4">
            {transactions.map((tx, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-accent/50 rounded-lg hover:bg-accent transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === 'buy' ? 'bg-solana-green/20' : 
                    tx.type === 'sell' ? 'bg-red-500/20' : 'bg-solana-purple/20'
                  }`}>
                    {tx.type === 'buy' ? (
                      <ArrowDownLeft className="w-5 h-5 text-solana-green" />
                    ) : tx.type === 'sell' ? (
                      <ArrowUpRight className="w-5 h-5 text-red-500" />
                    ) : (
                      <div className="w-5 h-5 bg-solana-purple rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{tx.nft}</h4>
                    <p className="text-sm text-muted-foreground capitalize">{tx.type} • {tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">{tx.price}</p>
                  <p className="text-sm text-solana-green capitalize">{tx.status}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline">
              Load More Transactions
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}