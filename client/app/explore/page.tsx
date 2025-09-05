"use client"

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { ExploreHeader } from '@/components/explore/explore-header'
import { CategoryGrid } from '@/components/explore/category-grid'
import { FeaturedCollections } from '@/components/explore/featured-collections'
import { NewDrops } from '@/components/explore/new-drops'

export default function ExplorePage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-8 p-6">
        <ExploreHeader />
        <CategoryGrid />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FeaturedCollections />
          <NewDrops />
        </div>
      </div>
    </DashboardLayout>
  )
}