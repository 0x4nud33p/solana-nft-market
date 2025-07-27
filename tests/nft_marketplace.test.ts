import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from "@solana/spl-token";
import { expect } from "chai";
import { NftMarketplace } from "../target/types/nft_marketplace";

describe("NFT Marketplace", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.NftMarketplace as Program<NftMarketplace>;
  const authority = provider.wallet as anchor.Wallet;
  const creator = Keypair.generate();
  const buyer = Keypair.generate();

  let marketplacePda: PublicKey;
  let mintKeypair: Keypair;
  let mintPda: PublicKey;
  let metadataPda: PublicKey;
  let masterEditionPda: PublicKey;
  let nftMetadataPda: PublicKey;
  let listingPda: PublicKey;
  let creatorTokenAccount: PublicKey;
  let buyerTokenAccount: PublicKey;

  before(async () => {
    // Airdrop SOL to test accounts
    await provider.connection.requestAirdrop(creator.publicKey, 2 * LAMPORTS_PER_SOL);
    await provider.connection.requestAirdrop(buyer.publicKey, 2 * LAMPORTS_PER_SOL);
    
    // Wait for airdrops to confirm
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find PDAs
    [marketplacePda] = PublicKey.findProgramAddressSync(
      [Buffer.from("marketplace")],
      program.programId
    );

    // Generate mint keyp