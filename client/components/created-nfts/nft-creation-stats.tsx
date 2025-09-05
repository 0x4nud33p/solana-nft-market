"use client"

import { motion } from 'framer-motion'
import { Plus, Eye, DollarSign, TrendingUp } from 'lucide-react'

const stats = [
  {
    title: 'Total Created',
    value: '24',
    change: '+3 this month',
    icon: Plus,
    color: 'text-solana-purple'
  },
  {
    title: 'Total Views',
    value: '1,234',
    change: '+12% this week',
    icon: Eye,
    color: 'text-solana-blue'
  },
  {
    title: 'Total Earnings',
    value: '45.8 SOL',
    change: '+8.5% this month',
    icon: DollarSign,
    color: 'text-solana-green'
  },
  {
    title: 'Listed Items',
    value: '18',
    change: '6 pending',
    icon: TrendingUp,
    color: 'text-orange-500'
  }
]

export function NFTCreationStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
            <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}