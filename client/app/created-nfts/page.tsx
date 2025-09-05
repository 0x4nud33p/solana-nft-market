"use client"

import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { CreatedNFTsHeader } from '@/components/created-nfts/created-nfts-header'
import { NFTCreationStats } from '@/components/created-nfts/nft-creation-stats'
import { CreatedNFTsGrid } from '@/components/created-nfts/created-nfts-grid'

export default function CreatedNFTsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <CreatedNFTsHeader />
        <NFTCreationStats />
        <CreatedNFTsGrid />
      </div>
    </DashboardLayout>
  )
}