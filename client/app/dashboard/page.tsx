"use client"

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { NFTGrid } from '@/components/dashboard/nft-grid'
import { TopSellers } from '@/components/dashboard/top-sellers'
import { DashboardTabs } from '@/components/dashboard/dashboard-tabs'

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <DashboardHeader />
        <DashboardTabs />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <NFTGrid />
          </div>
          <div className="space-y-6">
            <TopSellers />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}