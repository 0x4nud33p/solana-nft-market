"use client"

import { Navbar } from '@/components/navigation/navbar'
import { HeroSection } from '@/components/hero/hero-section'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />
      <HeroSection />
    </div>
  );
}