use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{self, Mint, Token, TokenAccount, Transfer as TokenTransfer},
};
use crate::{
    errors::*,
    state::*,
    constants::{MARKETPLACE_SEED, LISTING_SEED, NFT_METADATA_SEED},
};

pub fn handle(ctx: Context<BuyNft>) -> Result<()> {
    let listing = &mut ctx.accounts.listing;

    require!(listing.is_active, MarketplaceError::ListingNotActive);

    listing.is_active = false;

    let price = listing.price;
    let seller_amount = price * 95 / 100;
    let fee_amount = price - seller_amount;

    // Transfer SOL from buyer to seller
    transfer(
        CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            Transfer {
                from: ctx.accounts.buyer.to_account_info(),
                to: ctx.accounts.seller.to_account_info(),
            },
        ),
        seller_amount,
    )?;

    // Transfer SOL from buyer to marketplace authority
    transfer(
        CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            Transfer {
                from: ctx.accounts.buyer.to_account_info(),
                to: ctx.accounts.marketplace_authority.to_account_info(),
            },
        ),
        fee_amount,
    )?;

    // Transfer NFT from seller to buyer
    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            TokenTransfer {
                from: ctx.accounts.seller_token_account.to_account_info(),
                to: ctx.accounts.buyer_token_account.to_account_info(),
                authority: ctx.accounts.seller.to_account_info(),
            },
        ),
        1, // Transfer exactly 1 NFT
    )?;

    Ok(())
}

#[derive(Accounts)]
pub struct BuyNft<'info> {
    #[account(
        mut,
        seeds = [LISTING_SEED, mint.key().as_ref()],
        bump = listing.bump
    )]
    pub listing: Account<'info, Listing>,

    #[account(
        mut,
        seeds = [MARKETPLACE_SEED],
        bump = marketplace.bump
    )]
    pub marketplace: Account<'info, Marketplace>,

    #[account(
        mut,
        seeds = [NFT_METADATA_SEED, mint.key().as_ref()],
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

    /// CHECK: SOL recipient
    #[account(mut)]
    pub seller: UncheckedAccount<'info>,

    /// CHECK: Marketplace fee collector
    #[account(mut)]
    pub marketplace_authority: UncheckedAccount<'info>,

    #[account(mut)]
    pub buyer: Signer<'info>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}
