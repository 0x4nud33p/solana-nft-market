use anchor_lang::prelude::*;

pub mod instructions;
pub mod state;
pub mod errors;

use instructions::*;

declare_id!("HucP1Je7SSWCPc2H9h3C8cTnRqjXcjieVxKK2jo9TuMH");

#[program]
pub mod nft_marketplace {
    use super::*;

    pub fn initialize_marketplace(ctx: Context<InitializeMarketplace>) -> Result<()> {
        initialize_marketplace::handle(ctx)
    }

    pub fn create_nft(ctx: Context<CreateNft>, name: String, symbol: String, uri: String) -> Result<()> {
        create_nft::handle(ctx, name, symbol, uri)
    }

    pub fn list_nft(ctx: Context<ListNft>, price: u64) -> Result<()> {
        list_nft::handle(ctx, price)
    }

    pub fn update_listing(ctx: Context<UpdateListing>, new_price: u64) -> Result<()> {
        update_listing::handle(ctx, new_price)
    }

    pub fn cancel_listing(ctx: Context<CancelListing>) -> Result<()> {
        cancel_listing::handle(ctx)
    }

    pub fn buy_nft(ctx: Context<BuyNft>) -> Result<()> {
        buy_nft::handle(ctx)
    }

    pub fn withdraw_fees(ctx: Context<WithdrawFees>) -> Result<()> {
        withdraw_fees::handle(ctx)
    }
}
