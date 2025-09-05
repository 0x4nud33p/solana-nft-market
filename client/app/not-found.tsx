"use client"

import { motion } from 'framer-motion'
import { Home, Search, ArrowLeft, Compass } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-bright/10 to-purple-light/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-mint/10 to-cyan-light/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        {/* 404 Animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative">
            <motion.h1
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(153, 69, 255, 0.5)",
                  "0 0 40px rgba(20, 241, 149, 0.5)",
                  "0 0 20px rgba(153, 69, 255, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl md:text-9xl font-bold text-gradient mb-4"
            >
              404
            </motion.h1>
            
            {/* Floating NFT Elements */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-8 w-12 h-12 rounded-lg bg-gradient-to-br from-solana-purple to-solana-green opacity-60"
            />
            <motion.div
              animate={{ 
                y: [0, 15, 0],
                rotate: [0, -10, 10, 0]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-8 -right-4 w-8 h-8 rounded-full bg-gradient-to-r from-nft-gold to-solana-blue opacity-50"
            />
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8 space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            NFT Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Please check the URL or return to the dashboard.
          </p>
        </motion.div>

        {/* Suggested Actions */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-solana-purple hover:bg-solana-purple/90 text-white px-6 py-3">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </motion.div>
            </Link>
            
            <Link href="/explore">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" className="px-6 py-3">
                  <Compass className="w-4 h-4 mr-2" />
                  Explore NFTs
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}