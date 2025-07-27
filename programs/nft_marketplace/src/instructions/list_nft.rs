use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, TokenAccount};

use crate::{state::*, errors::*};

pub fn handle(ctx: Context<ListNft>, price: u64) -> Result<()> {
    let listing = &mut ctx.accounts.listing;

    listing.bump = *ctx.bumps.get("listing").unwrap();
    listing.seller = ctx.accounts.seller.key();
    listing.mint = ctx.accounts.mint.key();
    listing.price = price;
    listing.is_active = true;

    Ok(())
}

#[derive(Accounts)]
pub struct ListNft<'info> {
    #[account(
        init,
        payer = seller,
        space = 8 + Listing::INIT_SPACE,
        seeds = [b"listing", mint.key().as_ref()],
        bump
    )]
    pub listing: Account<'info, Listing>,

    #[account(
        mut,
        seeds = [b"nft_metadata", mint.key().as_ref()],
        bump = nft_metadata.bump
    )]
    pub nft_metadata: Account<'info, NftMetadata>,

    pub mint: Account<'info, Mint>,

    #[account(
        constraint = seller_token_account.mint == mint.key(),
        constraint = seller_token_account.owner == seller.key(),
        constraint = seller_token_account.amount == 1
    )]
    pub seller_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub seller: Signer<'info>,

    pub system_program: Program<'info, System>,
}
