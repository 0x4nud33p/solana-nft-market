use anchor_lang::prelude::*;
use anchor_spl::token::Mint;
use crate::{state::*, errors::*};

pub fn handle(ctx: Context<UpdateListing>, new_price: u64) -> Result<()> {
    let listing = &mut ctx.accounts.listing;
    listing.price = new_price;
    Ok(())
}

#[derive(Accounts)]
pub struct UpdateListing<'info> {
    #[account(
        mut,
        seeds = [b"listing", mint.key().as_ref()],
        bump = listing.bump,
        constraint = listing.seller == seller.key() @ MarketplaceError::UnauthorizedSeller
    )]
    pub listing: Account<'info, Listing>,

    pub mint: Account<'info, Mint>,

    #[account(mut)]
    pub seller: Signer<'info>,
}
