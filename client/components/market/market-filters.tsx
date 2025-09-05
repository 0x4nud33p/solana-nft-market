"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'

const categories = [
  'Art', 'Gaming', 'Music', 'Photography', 'Sports', 'Collectibles'
]

const collections = [
  'Solana Monkeys', 'DeGods', 'Okay Bears', 'Famous Fox Federation'
]

export function MarketFilters() {
  const [priceRange, setPriceRange] = useState([0, 100])

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-card rounded-xl border border-border p-6 space-y-6"
    >
      <h3 className="text-lg font-semibold text-foreground">Filters</h3>

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Price Range (SOL)</h4>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{priceRange[0]} SOL</span>
          <span>{priceRange[1]} SOL</span>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox id={category} />
              <label htmlFor={category} className="text-sm text-muted-foreground">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Collections */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Collections</h4>
        <div className="space-y-2">
          {collections.map((collection) => (
            <div key={collection} className="flex items-center space-x-2">
              <Checkbox id={collection} />
              <label htmlFor={collection} className="text-sm text-muted-foreground">
                {collection}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full bg-solana-purple hover:bg-solana-purple/90">
        Apply Filters
      </Button>
    </motion.div>
  )
}