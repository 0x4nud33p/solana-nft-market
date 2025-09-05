"use client"

import { motion } from 'framer-motion'
import { X, Settings, Moon, Sun, Bell, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useTheme } from 'next-themes'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { theme, setTheme } = useTheme()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-2xl mx-4 bg-card rounded-2xl border border-border shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground flex items-center">
            <Settings className="w-6 h-6 mr-2 text-slate-blue" />
            Settings
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Appearance</h3>
            <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
              <div className="flex items-center space-x-3">
                {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                <div>
                  <p className="font-medium text-foreground">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Toggle dark/light theme</p>
                </div>
              </div>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5" />
                  <div>
                    <p className="font-medium text-foreground">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Get notified about bids and sales</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5" />
                  <div>
                    <p className="font-medium text-foreground">Security Alerts</p>
                    <p className="text-sm text-muted-foreground">Important security notifications</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button className="bg-solana-purple hover:bg-solana-purple/90">
              Save Changes
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}