"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const tabs = [
  { id: 'own', label: 'Own NFTs', active: true },
  { id: 'transfer', label: 'Transfer', active: false },
  { id: 'list', label: 'List For Sale', active: false },
  { id: 'listings', label: 'My Listings', active: false },
  { id: 'burn', label: 'Burn NFT', active: false },
]

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState('own')
  const [sortBy, setSortBy] = useState('Recently Added')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
      </div>

      <div className="flex items-center justify-between">
        {/* Tabs */}
        <div className="flex items-center space-x-1 bg-card rounded-lg p-1 border border-border">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-all relative",
                activeTab === tab.id
                  ? "text-black"
                  : "text-muted-foreground hover:text-foreground"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-mint rounded-md text-black"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
             <span className={cn("relative z-10", activeTab === tab.id ? "text-black" : "text-muted-foreground")}>
              {tab.label}
             </span>
            </motion.button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort By:</span>
          <button className="flex items-center space-x-2 px-3 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors">
            <span>{sortBy}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}