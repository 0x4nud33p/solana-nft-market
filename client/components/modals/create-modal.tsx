"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Upload,
  Image,
  Palette,
  Zap,
  Plus,
  Minus,
  DollarSign,
  Tag,
  FileText,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { uploadToPinata } from "@/lib/nftStorage";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Attribute {
  trait_type: string;
  value: string;
}

export function CreateModal({ isOpen, onClose }: CreateModalProps) {
  const [step, setStep] = useState(1);
  const [nftType, setNftType] = useState<"single" | "collection">("single");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [attributes, setAttributes] = useState<Attribute[]>([
    { trait_type: "", value: "" },
  ]);
  const [isListing, setIsListing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    royalty: "5",
    category: "",
    externalUrl: "",
    unlockableContent: false,
    unlockableDescription: "",
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const addAttribute = () => {
    setAttributes([...attributes, { trait_type: "", value: "" }]);
  };

  const removeAttribute = (index: number) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  const updateAttribute = (
    index: number,
    field: "trait_type" | "value",
    value: string
  ) => {
    const updated = attributes.map((attr, i) =>
      i === index ? { ...attr, [field]: value } : attr
    );
    setAttributes(updated);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMint = async () => {
    if (!uploadedFile) return alert("No file uploaded");

    setIsListing(true);
    const metadataURL = await uploadToPinata({
      file: uploadedFile,
      meta: {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        externalURL: formData.externalUrl,
      },
    });

    console.log("Metadata URI:", metadataURL);
    // pass metadataURL to your Anchor mint instruction
  };

  const handleCancel = () => {
    setStep(1);
    setNftType("single");
    setUploadedFile(null);
    setPreviewUrl(null);
    setIsListing(false);
    setFormData({
      name: "",
      description: "",
      price: "",
      royalty: "5",
      category: "",
      externalUrl: "",
      unlockableContent: false,
      unlockableDescription: "",
    });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
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
        className="relative w-full max-w-4xl mx-4 bg-card rounded-2xl border border-border shadow-2xl max-h-[100vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-solana-purple to-solana-green flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Create NFT</h2>
              <p className="text-sm text-muted-foreground">Step {step} of 3</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-2">
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    i <= step
                      ? "bg-solana-purple text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i}
                </div>
                {i < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 rounded-full ${
                      i < step ? "bg-solana-purple" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Upload & Type</span>
            <span>Details & Attributes</span>
            <span>Pricing & Mint</span>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <AnimatePresence mode="wait">
            {/* Step 1: Upload & Type Selection */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                {/* File Upload */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Upload File</Label>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <input
                        type="file"
                        id="file-upload"
                        accept="image/*,video/*,audio/*,.glb,.gltf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="file-upload"
                        className="block border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-solana-purple/50 transition-colors cursor-pointer"
                      >
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-1">
                          Drag & drop or click to upload
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, GIF, MP4, MP3, GLB up to 100MB
                        </p>
                      </label>
                    </div>

                    {/* Preview */}
                    {previewUrl && (
                      <div className="space-y-2">
                        {/* <Label className="text-sm font-medium">Preview</Label> */}
                        <div className="aspect-square rounded-lg overflow-hidden bg-muted max-h-[400px]">
                          <X
                            className="absolute cursor-pointer"
                            onClick={() => setPreviewUrl(null)}
                          />
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">NFT Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter NFT name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your NFT"
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        className="mt-1"
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          handleInputChange("category", value)
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="art">Art</SelectItem>
                          <SelectItem value="gaming">Gaming</SelectItem>
                          <SelectItem value="music">Music</SelectItem>
                          <SelectItem value="photography">
                            Photography
                          </SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="collectibles">
                            Collectibles
                          </SelectItem>
                          <SelectItem value="others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="external-url">External URL</Label>
                      <div className="relative mt-1">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="external-url"
                          placeholder="https://yoursite.com"
                          value={formData.externalUrl}
                          onChange={(e) =>
                            handleInputChange("externalUrl", e.target.value)
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Pricing & Mint */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="price">Price (SOL)</Label>
                      <div className="relative mt-1">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={formData.price}
                          onChange={(e) =>
                            handleInputChange("price", e.target.value)
                          }
                          className="pl-10"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Leave empty to mint without listing for sale
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="royalty">Royalty (%)</Label>
                      <div className="relative mt-1">
                        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="royalty"
                          type="number"
                          min="0"
                          max="10"
                          placeholder="5"
                          value={formData.royalty}
                          onChange={(e) =>
                            handleInputChange("royalty", e.target.value)
                          }
                          className="pl-10"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Suggested: 5-10%. Maximum: 10%
                      </p>
                    </div>
                  </div>

                  <div className="bg-accent/50 rounded-lg p-4 space-y-3">
                    <h3 className="font-semibold text-foreground">Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Minting Fee:
                        </span>
                        <span className="text-foreground">0.01 SOL</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Platform Fee:
                        </span>
                        <span className="text-foreground">2.5%</span>
                      </div>
                      {formData.price && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Listing Fee:
                          </span>
                          <span className="text-foreground">0.005 SOL</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total Cost:</span>
                        <span className="text-solana-purple">
                          {formData.price ? "0.015 SOL" : "0.01 SOL"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Review */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-3">
                    Review Your NFT
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {previewUrl && (
                      <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                        <img
                          src={previewUrl}
                          alt="NFT Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Name: </span>
                        <span className="text-foreground font-medium">
                          {formData.name || "Untitled"}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Type: </span>
                        <span className="text-foreground capitalize">
                          {nftType}
                        </span>
                      </div>
                      {formData.category && (
                        <div>
                          <span className="text-muted-foreground">
                            Category:{" "}
                          </span>
                          <span className="text-foreground capitalize">
                            {formData.category}
                          </span>
                        </div>
                      )}
                      {formData.price && (
                        <div>
                          <span className="text-muted-foreground">Price: </span>
                          <span className="text-foreground font-medium">
                            {formData.price} SOL
                          </span>
                        </div>
                      )}
                      <div>
                        <span className="text-muted-foreground">Royalty: </span>
                        <span className="text-foreground">
                          {formData.royalty}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-border overflow-hidden">
          <div className="flex space-x-3">
            {step > 1 && (
              <Button variant="outline" onClick={prevStep}>
                Previous
              </Button>
            )}
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            {step < 3 ? (
              <Button
                onClick={nextStep}
                disabled={step === 1 && !uploadedFile}
                className="bg-solana-purple hover:bg-solana-purple/90"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleMint}
                disabled={isListing || !formData.name}
                className="bg-solana-purple hover:bg-solana-purple/90"
              >
                {isListing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Minting...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>Mint NFT</span>
                  </div>
                )}
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
