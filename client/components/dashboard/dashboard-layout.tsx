"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Home, 
  TrendingUp, 
  Compass, 
  Plus, 
  History, 
  Wallet, 
  Settings, 
  Clock,
  Wrench,
  ChevronLeft,
  ChevronRight,
  Coins
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const sidebarItems = [
  {
    title: 'Marketplace',
    items: [
      { name: 'Market', href: '/market', icon: TrendingUp },
      { name: 'Dashboard', href: '/dashboard', icon: Home },
      { name: 'Explore', href: '/explore', icon: Compass },
    ]
  },
  {
    title: 'Account',
    items: [
      { name: 'Created NFTs', href: '/created', icon: Plus },
      { name: 'History', href: '/history', icon: History },
      { name: 'Wallet', href: '/wallet', icon: Wallet },
      { name: 'Settings', href: '/settings', icon: Settings },
    ]
  }
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-card border-r border-border flex flex-col"
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <motion.div
              animate={{ opacity: collapsed ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-bright to-cyan-light">
                <Coins className="h-6 w-6 text-white dark:text-slate-800" />
              </div>
              {!collapsed && (
                <span className="text-xl font-bold text-foreground">Mintly</span>
              )}
            </motion.div>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded-md hover:bg-accent transition-colors"
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Create Button */}
        <div className="p-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full bg-accent text-accent-foreground rounded-lg py-3 px-4 font-medium transition-all hover:bg-accent/80",
              collapsed && "px-3"
            )}
          >
            <div className="flex items-center justify-center space-x-2">
              <Plus className="w-4 h-4" />
              {!collapsed && <span>Create</span>}
            </div>
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-6">
          {sidebarItems.map((section) => (
            <div key={section.title}>
              {!collapsed && (
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
              )}
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                          isActive
                            ? "bg-solana-purple/10 text-solana-purple border-r-2 border-solana-purple"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent",
                          collapsed && "justify-center"
                        )}
                      >
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        {!collapsed && <span>{item.name}</span>}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        {/* <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground">
            {!collapsed && (
              <>
                <div className="flex items-center space-x-1 mb-1">
                  <span>Made By</span>
                <div className="text-solana-purple">@Mintly</div>
                </div>
              </>
            )}
          </div>
        </div> */}
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}