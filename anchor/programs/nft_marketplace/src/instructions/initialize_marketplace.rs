use anchor_lang::prelude::*;
use crate::state::*;

pub fn handle(ctx: Context<InitializeMarketplace>) -> Result<()> {
    let marketplace = &mut ctx.accounts.marketplace;
    marketplace.bump = *ctx.bumps.get("marketplace").unwrap();
    marketplace.authority = ctx.accounts.authority.key();
    Ok(())
}

#[derive(Accounts)]
pub struct InitializeMarketplace<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + Marketplace::INIT_SPACE,
        seeds = [b"marketplace"],
        bump
    )]
    pub marketplace: Account<'info, Marketplace>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

