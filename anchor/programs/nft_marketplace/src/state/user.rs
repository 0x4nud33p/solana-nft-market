use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct UserProfile {
    pub owner: Pubkey,
    pub nfts_created: u32,
    pub nfts_sold: u32,
    pub total_earnings: u64,
    pub bump: u8,
}