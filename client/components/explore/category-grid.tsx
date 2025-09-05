"use client"

import { motion } from 'framer-motion'

const categories = [
  { name: 'Art', icon: '🎨', count: '12.5K', color: 'from-purple-500 to-pink-500' },
  { name: 'Gaming', icon: '🎮', count: '8.2K', color: 'from-blue-500 to-cyan-500' },
  { name: 'Music', icon: '🎵', count: '3.7K', color: 'from-green-500 to-teal-500' },
  { name: 'Photography', icon: '📸', count: '5.1K', color: 'from-yellow-500 to-orange-500' },
  { name: 'Sports', icon: '⚽', count: '2.9K', color: 'from-red-500 to-pink-500' },
  { name: 'Collectibles', icon: '🏆', count: '15.3K', color: 'from-indigo-500 to-purple-500' },
  { name: 'Virtual Worlds', icon: '🌍', count: '4.6K', color: 'from-cyan-500 to-blue-500' },
  { name: 'Utility', icon: '🔧', count: '1.8K', color: 'from-gray-500 to-slate-500' }
]

export function CategoryGrid() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Browse by Category</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="group cursor-pointer"
          >
            <div className={`bg-gradient-to-br ${category.color} p-6 rounded-xl text-white relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="relative z-10 text-center space-y-2">
                <div className="text-3xl">{category.icon}</div>
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-sm opacity-90">{category.count} NFTs</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}