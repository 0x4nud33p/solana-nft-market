"use client"

import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Shield } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-slate-950/5 dark:to-slate-50/5"></div>
      
      {/* Animated Background Shapes */}
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

      {/* Mesh Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3"></div>

      {/* Wave Shape at Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto text-slate-200/10 dark:text-slate-800/20"
          fill="currentColor"
        >
          <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
        {/* Recognition Badge */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center rounded-full border border-border bg-card/50 backdrop-blur-sm px-4 py-2">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Powering next-gen NFT experiences on Solana
            </span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-hero xl:text-hero-lg font-bold tracking-tight">
            <span className="block text-foreground">Discover, Trade & Create</span>
            <span className="block text-foreground mt-2">Extraordinary NFTs</span>
            <span className="block text-foreground mt-2">on Solana</span>
          </h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            The fastest, most affordable NFT marketplace built on Solana. 
            Trade with confidence, create with ease, and join the future of digital ownership.
          </motion.p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Explore Button (Ghost) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center space-x-2 rounded-xl border border-solana-purple/50 bg-transparent px-8 py-3 text-sm font-semibold text-foreground transition-all hover:bg-solana-purple/10 hover:border-solana-purple"
          >
            <Link href={"/explore"}>Explore NFTs</Link>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.button>

          {/* Create Button (Filled) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex text-foreground items-center space-x-2 rounded-xl text-grad px-8 py-3 text-sm font-semibold dark:text-white transition-all hover:shadow-lg nft-glow"
          >
            <Link href={"/explore"}>Create NFT</Link>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

        {/* Stats Section */}
        {/* <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          <div className="text-center mb-20">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl font-bold text-gradient mb-1"
            >
              50K+
            </motion.div>
            <div className="text-sm text-muted-foreground">NFTs Traded</div>
          </div>
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="text-2xl font-bold text-gradient mb-1"
            >
              12K+
            </motion.div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="text-2xl font-bold text-gradient mb-1"
            >
              2.5M SOL
            </motion.div>
            <div className="text-sm text-muted-foreground">Volume Traded</div>
          </div>
        </motion.div> */}

        {/* Floating Animation Element */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 hidden lg:block"
        >
          <div className="w-8 h-8 rounded-lg solana-gradient opacity-60 nft-glow"></div>
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, 15, 0],
            x: [0, 10, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 left-1/4 hidden lg:block"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-nft-gold to-solana-green opacity-50 pulse-glow"></div>
        </motion.div>

        {/* Additional floating elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 left-1/6 hidden lg:block"
        >
          <TrendingUp className="w-6 h-6 text-solana-green opacity-40" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, 12, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-1/4 right-1/6 hidden lg:block"
        >
          <Shield className="w-5 h-5 text-solana-blue opacity-50" />
        </motion.div>
      </div>
    </section>
  )
}