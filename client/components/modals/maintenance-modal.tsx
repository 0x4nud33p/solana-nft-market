"use client"

import { motion } from 'framer-motion'
import { X, Wrench, AlertTriangle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MaintenanceModalProps {
  isOpen: boolean
  onClose: () => void
}

export function MaintenanceModal({ isOpen, onClose }: MaintenanceModalProps) {
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
        className="relative w-full max-w-md mx-4 bg-card rounded-2xl border border-border shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground flex items-center">
            <Wrench className="w-6 h-6 mr-2 text-orange-500" />
            Maintenance
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 text-center space-y-6">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 mx-auto bg-orange-500/20 rounded-full flex items-center justify-center"
          >
            <AlertTriangle className="w-8 h-8 text-orange-500" />
          </motion.div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">Scheduled Maintenance</h3>
            <p className="text-muted-foreground">
              We're performing routine maintenance to improve your experience.
            </p>
          </div>

          <div className="bg-accent/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Estimated Duration</span>
            </div>
            <div className="text-2xl font-bold text-solana-purple">2 hours</div>
            <p className="text-xs text-muted-foreground">
              Started: Today at 2:00 AM UTC<br />
              Expected completion: Today at 4:00 AM UTC
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              During this time, some features may be temporarily unavailable.
            </p>
            <Button variant="outline" className="w-full" onClick={onClose}>
              I Understand
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}