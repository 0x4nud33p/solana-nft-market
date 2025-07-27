use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct NftMetadata {
    pub mint: Pubkey,
    pub creator: Pubkey,
    #[max_len(32)]
    pub name: String,
    #[max_len(200)]
    pub uri: String,
    pub is_listed: bool,
    pub bump: u8,
}

