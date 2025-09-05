pub mod instructions;
pub mod state;
pub mod error;
pub mod events;
pub mod constants;

use anchor_lang::prelude::*;

pub use instructions::*;
pub use state::*;
pub use events::*;
pub use constants::*;

declare_id!("HucP1Je7SSWCPc2H9h3C8cTnRqjXcjieVxKK2jo9TuMH");

#[program]
pub mod nft_marketplace {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, name: String, fee: u16) -> Result<()> {
        ctx.accounts.init(name, fee, &ctx.bumps)?;

        emit!(InitializeEvent {
            admin: ctx.accounts.admin.key(),
            fee: ctx.accounts.marketplace.fee,
            marketplace: ctx.accounts.marketplace.key(),
            treasury: ctx.accounts.treasury.key(),
            reward_mint: ctx.accounts.reward_mint.key(),
            name: ctx.accounts.marketplace.name.clone(),
        });

        Ok(())
    }
}
