import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { NftMarketplace } from "../target/types/nft_marketplace";

module.exports = async function (provider: anchor.AnchorProvider) {
  // Configure the client
  anchor.setProvider(provider);

  const program = anchor.workspace.NftMarketplace as Program<NftMarketplace>;
  const authority = provider.wallet.publicKey;

  console.log("Deploying NFT Marketplace...");
  console.log("Program ID:", program.programId.toString());
  console.log("Authority:", authority.toString());

  try {
    // Find marketplace PDA
    const [marketplacePda] = PublicKey.findProgramAddressSync(
      [Buffer.from("marketplace")],
      program.programId
    );

    console.log("Marketplace PDA:", marketplacePda.toString());

    // Check if marketplace is already initialized
    try {
      const marketplaceAccount = await program.account.marketplace.fetch(marketplacePda);
      console.log("Marketplace already initialized!");
      console.log("Current fee percentage:", marketplaceAccount.feePercentage);
      return;
    } catch (error) {
      console.log("Marketplace not initialized, creating...");
    }

    // Initialize marketplace with 2.5% fee
    const feePercentage = 250; // 2.5% in basis points

    const tx = await program.methods
      .initializeMarketplace(feePercentage)
      .accounts({
        marketplace: marketplacePda,
        authority: authority,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    console.log("Marketplace initialized successfully!");
    console.log("Transaction signature:", tx);
    console.log("Fee percentage set to:", feePercentage / 100, "%");

  } catch (error) {
    console.error("Error during deployment:", error);
    throw error;
  }
};