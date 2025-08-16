use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    metadata::Metadata,
    token::{Mint, Token, TokenAccount},
};
use mpl_token_metadata::instruction::create_metadata_accounts_v3;

use crate::{state::*, errors::*};

pub fn handle(
    ctx: Context<CreateNft>,
    name: String,
    symbol: String,
    uri: String,
) -> Result<()> {
    // implement mint + metadata logic here
    Ok(())
}

#[derive(Accounts)]
pub struct CreateNft<'info> {
    
}
