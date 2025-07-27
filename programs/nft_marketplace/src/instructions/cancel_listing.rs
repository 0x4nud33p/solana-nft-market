use anchor_lang::prelude::*;
use anchor_spl::token::Mint;
use crate::{state::*, errors::*};

pub fn handle(ctx: Context<CancelListing>) -> Result<()> {
    let listing = &mut ctx.accounts.listing;
    listing.is_active = false;
    Ok(())
}

#[derive(Accounts)]
pub struct CancelListing<'info> {
    #[account(
        mut,
        seeds = [b"listing", mint.key().as_ref()],
        bump = listing.bump,
        constraint = listing.seller == seller.key() @ MarketplaceError::UnauthorizedSeller
    )]
    pub listing: Account<'info, Listing>,

    #[account(
        mut,
        seeds = [b"nft_metadata", mint.key().as_ref()],
        bump = nft_metadata.bump
    )]
    pub nft_metadata: Account<'info, NftMetadata>,

    pub mint: Account<'info, Mint>,

    #[account(mut)]
    pub seller: Signer<'info>,
}
