use anchor_lang::prelude::*;

declare_id!("HucP1Je7SSWCPc2H9h3C8cTnRqjXcjieVxKK2jo9TuMH");

#[program]
pub mod anchor {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
