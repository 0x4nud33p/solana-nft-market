// Maximum fee percentage (10% = 1000 basis points)
pub const MAX_FEE_PERCENTAGE: u16 = 1000;

// Minimum price for NFT listings (in lamports)
pub const MIN_PRICE: u64 = 1_000_000; // 0.001 SOL

// Maximum name length for NFTs
pub const MAX_NAME_LENGTH: usize = 32;

// Maximum URI length for NFT metadata
pub const MAX_URI_LENGTH: usize = 200;

// Seeds for PDA derivation
pub const MARKETPLACE_SEED: &[u8] = b"marketplace";
pub const LISTING_SEED: &[u8] = b"listing";
pub const NFT_METADATA_SEED: &[u8] = b"nft_metadata";
pub const MINT_SEED: &[u8] = b"mint";
pub const USER_PROFILE_SEED: &[u8] = b"user_profile";