use anchor_lang::prelude::*;
use anchor_spl::{associated_token::AssociatedToken, token::{Token, TokenAccount, Mint}};
use crate::{state::*, errors::*};

pub fn handle(ctx: Context<BuyNft>) -> Result<()> {
    let listing = &mut ctx.accounts.listing;
    require!(listing.is_active, MarketplaceError::ListingNotActive);

    listing.is_active = false;

    let lamports = listing.price;
    **ctx.accounts.seller.try_borrow_mut_lamports()? += lamports * 95 / 100;
    **ctx.accounts.marketplace_authority.try_borrow_mut_lamports()? += lamports * 5 / 100;
    **ctx.accounts.buyer.try_borrow_mut_lamports()? -= lamports;

    Ok(())
}

#[derive(Accounts)]
pub struct BuyNft<'info> {
    #[account(
        mut,
        seeds = [b"listing", mint.key().as_ref()],
        bump = listing.bump
    )]
    pub listing: Account<'info, Listing>,

    #[account(
        mut,
        seeds = [b"marketplace"],
        bump = marketplace.bump
    )]
    pub marketplace: Account<'info, Marketplace>,

    #[account(
        mut,
        seeds = [b"nft_metadata", mint.key().as_ref()],
        bump = nft_metadata.bump
    )]
    pub nft_metadata: Account<'info, NftMetadata>,

    pub mint: Account<'info, Mint>,

    #[account(mut)]
    pub seller_token_account: Account<'info, TokenAccount>,

    #[account(
        init_if_needed,
        payer = buyer,
        associated_token::mint = mint,
        associated_token::authority = buyer
    )]
    pub buyer_token_account: Account<'info, TokenAccount>,

    /// CHECK:
    #[account(mut)]
    pub seller: UncheckedAccount<'info>,

    /// CHECK:
    #[account(mut)]
    pub marketplace_authority: UncheckedAccount<'info>,

    #[account(mut)]
    pub buyer: Signer<'info>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}
