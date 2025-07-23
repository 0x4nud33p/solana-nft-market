"use client"

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { MarketHeader } from '@/components/market/market-header'
import { MarketFilters } from '@/components/market/market-filters'
import { CollectionGrid } from '@/components/market/collection-grid'
import { TrendingSection } from '@/components/market/trending-section'

export default function MarketPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <MarketHeader />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <MarketFilters />
          </div>
          <div className="lg:col-span-3 space-y-6">
            <TrendingSection />
            <CollectionGrid />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}