"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Upload, Image, Palette, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface CreateModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateModal({ isOpen, onClose }: CreateModalProps) {
  const [step, setStep] = useState(1)

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
          <h2 className="text-2xl font-bold text-foreground">Create NFT</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 border-2 border-dashed border-border rounded-xl hover:border-solana-purple/50 transition-colors cursor-pointer"
                >
                  <div className="text-center space-y-3">
                    <Image className="w-12 h-12 mx-auto text-muted-foreground" />
                    <div>
                      <h3 className="font-semibold text-foreground">Single NFT</h3>
                      <p className="text-sm text-muted-foreground">Create a unique digital asset</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 border-2 border-dashed border-border rounded-xl hover:border-solana-green/50 transition-colors cursor-pointer"
                >
                  <div className="text-center space-y-3">
                    <Palette className="w-12 h-12 mx-auto text-muted-foreground" />
                    <div>
                      <h3 className="font-semibold text-foreground">Collection</h3>
                      <p className="text-sm text-muted-foreground">Create multiple NFTs</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">NFT Name</Label>
                  <Input id="name" placeholder="Enter NFT name" className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe your NFT" className="mt-1" />
                </div>

                <div>
                  <Label>Upload File</Label>
                  <div className="mt-1 border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-solana-purple/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button className="bg-solana-purple hover:bg-solana-purple/90">
              <Zap className="w-4 h-4 mr-2" />
              Create NFT
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}