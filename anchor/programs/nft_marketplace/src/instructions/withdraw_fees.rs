use anchor_lang::prelude::*;
use crate::{state::*, errors::*};

pub fn handle(ctx: Context<WithdrawFees>) -> Result<()> {
    let lamports = **ctx.accounts.marketplace.to_account_info().lamports.borrow();
    **ctx.accounts.marketplace.to_account_info().lamports.borrow_mut() -= lamports;
    **ctx.accounts.marketplace_authority.try_borrow_mut_lamports()? += lamports;
    Ok(())
}

#[derive(Accounts)]
pub struct WithdrawFees<'info> {
    #[account(
        mut,
        seeds = [b"marketplace"],
        bump = marketplace.bump,
        constraint = marketplace.authority == authority.key() @ MarketplaceError::UnauthorizedAuthority
    )]
    pub marketplace: Account<'info, Marketplace>,

    /// CHECK:
    #[account(mut)]
    pub marketplace_authority: UncheckedAccount<'info>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}