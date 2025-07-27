use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    metadata::{
        create_master_edition_v3, create_metadata_accounts_v3, CreateMasterEditionV3,
        CreateMetadataAccountsV3, Metadata,
    },
    token::{mint_to, Mint, MintTo, Token, TokenAccount},
};
use mpl_token_metadata::{
    pda::{find_master_edition_account, find_metadata_account},
    state::{DataV2, Creator},
};

declare_id!("HucP1Je7SSWCPc2H9h3C8cTnRqjXcjieVxKK2jo9TuMH");

pub mod instructions;
pub mod state;
pub mod errors;
pub mod constants;

use instructions::*;
use state::*;
use errors::*;
use constants::*;

#[program]
pub mod nft_marketplace {
    use super::*;

    // Initialize the marketplace
    pub fn initialize_marketplace(
        ctx: Context<InitializeMarketplace>,
        fee_percentage: u16,
    ) -> Result<()> {
        let marketplace = &mut ctx.accounts.marketplace;
        marketplace.authority = ctx.accounts.authority.key();
        marketplace.fee_percentage = fee_percentage;
        marketplace.total_sales = 0;
        marketplace.total_volume = 0;
        marketplace.bump = *ctx.bumps.get("marketplace").unwrap();
        Ok(())
    }

    // Create an NFT
    pub fn create_nft(
        ctx: Context<CreateNft>,
        name: String,
        symbol: String,
        uri: String,
        seller_fee_basis_points: u16,
    ) -> Result<()> {
        let seeds = &[
            "mint".as_bytes(),
            ctx.accounts.creator.key().as_ref(),
            &[ctx.bumps.mint],
        ];
        let signer = [&seeds[..]];

        // Mint one token to the creator
        mint_to(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                MintTo {
                    mint: ctx.accounts.mint.to_account_info(),
                    to: ctx.accounts.token_account.to_account_info(),
                    authority: ctx.accounts.mint.to_account_info(),
                },
                &signer,
            ),
            1,
        )?;

        // Create metadata
        let creators = vec![Creator {
            address: ctx.accounts.creator.key(),
            verified: true,
            share: 100,
        }];

        let data_v2 = DataV2 {
            name,
            symbol,
            uri,
            seller_fee_basis_points,
            creators: Some(creators),
            collection: None,
            uses: None,
        };

        create_metadata_accounts_v3(
            CpiContext::new_with_signer(
                ctx.accounts.metadata_program.to_account_info(),
                CreateMetadataAccountsV3 {
                    metadata: ctx.accounts.metadata.to_account_info(),
                    mint: ctx.accounts.mint.to_account_info(),
                    mint_authority: ctx.accounts.mint.to_account_info(),
                    update_authority: ctx.accounts.creator.to_account_info(),
                    payer: ctx.accounts.creator.to_account_info(),
                    system_program: ctx.accounts.system_program.to_account_info(),
                    rent: ctx.accounts.rent.to_account_info(),
                },
                &signer,
            ),
            data_v2,
            false,
            true,
            None,
        )?;

        // Create master edition
        create_master_edition_v3(
            CpiContext::new_with_signer(
                ctx.accounts.metadata_program.to_account_info(),
                CreateMasterEditionV3 {
                    edition: ctx.accounts.master_edition.to_account_info(),
                    mint: ctx.accounts.mint.to_account_info(),
                    update_authority: ctx.accounts.creator.to_account_info(),
                    mint_authority: ctx.accounts.mint.to_account_info(),
                    payer: ctx.accounts.creator.to_account_info(),
                    metadata: ctx.accounts.metadata.to_account_info(),
                    token_program: ctx.accounts.token_program.to_account_info(),
                    system_program: ctx.accounts.system_program.to_account_info(),
                    rent: ctx.accounts.rent.to_account_info(),
                },
                &signer,
            ),
            Some(0),
        )?;

        // Initialize NFT metadata account
        let nft_metadata = &mut ctx.accounts.nft_metadata;
        nft_metadata.mint = ctx.accounts.mint.key();
        nft_metadata.creator = ctx.accounts.creator.key();
        nft_metadata.name = ctx.accounts.metadata.data.name.clone();
        nft_metadata.uri = ctx.accounts.metadata.data.uri.clone();
        nft_metadata.is_listed = false;
        nft_metadata.bump = *ctx.bumps.get("nft_metadata").unwrap();

        Ok(())
    }

    // List NFT for sale
    pub fn list_nft(
        ctx: Context<ListNft>,
        price: u64,
    ) -> Result<()> {
        let listing = &mut ctx.accounts.listing;
        listing.seller = ctx.accounts.seller.key();
        listing.mint = ctx.accounts.mint.key();
        listing.price = price;
        listing.is_active = true;
        listing.bump = *ctx.bumps.get("listing").unwrap();

        // Update NFT metadata
        let nft_metadata = &mut ctx.accounts.nft_metadata;
        nft_metadata.is_listed = true;

        Ok(())
    }

    // Buy NFT
    pub fn buy_nft(ctx: Context<BuyNft>) -> Result<()> {
        let listing = &mut ctx.accounts.listing;
        require!(listing.is_active, MarketplaceError::ListingNotActive);

        let marketplace = &ctx.accounts.marketplace;
        let price = listing.price;
        let fee = (price * marketplace.fee_percentage as u64) / 10000;
        let seller_amount = price - fee;

        // Transfer SOL from buyer to seller
        anchor_lang::system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                anchor_lang::system_program::Transfer {
                    from: ctx.accounts.buyer.to_account_info(),
                    to: ctx.accounts.seller.to_account_info(),
                },
            ),
            seller_amount,
        )?;

        // Transfer fee to marketplace authority
        if fee > 0 {
            anchor_lang::system_program::transfer(
                CpiContext::new(
                    ctx.accounts.system_program.to_account_info(),
                    anchor_lang::system_program::Transfer {
                        from: ctx.accounts.buyer.to_account_info(),
                        to: ctx.accounts.marketplace_authority.to_account_info(),
                    },
                ),
                fee,
            )?;
        }

        // Transfer NFT from seller to buyer
        anchor_spl::token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                anchor_spl::token::Transfer {
                    from: ctx.accounts.seller_token_account.to_account_info(),
                    to: ctx.accounts.buyer_token_account.to_account_info(),
                    authority: ctx.accounts.seller.to_account_info(),
                },
            ),
            1,
        )?;

        // Update listing and marketplace stats
        listing.is_active = false;
        let marketplace = &mut ctx.accounts.marketplace;
        marketplace.total_sales += 1;
        marketplace.total_volume += price;

        // Update NFT metadata
        let nft_metadata = &mut ctx.accounts.nft_metadata;
        nft_metadata.is_listed = false;

        Ok(())
    }

    // Cancel listing
    pub fn cancel_listing(ctx: Context<CancelListing>) -> Result<()> {
        let listing = &mut ctx.accounts.listing;
        require!(listing.is_active, MarketplaceError::ListingNotActive);
        require!(
            listing.seller == ctx.accounts.seller.key(),
            MarketplaceError::UnauthorizedSeller
        );

        listing.is_active = false;

        // Update NFT metadata
        let nft_metadata = &mut ctx.accounts.nft_metadata;
        nft_metadata.is_listed = false;

        Ok(())
    }

    // Update listing price
    pub fn update_listing(
        ctx: Context<UpdateListing>,
        new_price: u64,
    ) -> Result<()> {
        let listing = &mut ctx.accounts.listing;
        require!(listing.is_active, MarketplaceError::ListingNotActive);
        require!(
            listing.seller == ctx.accounts.seller.key(),
            MarketplaceError::UnauthorizedSeller
        );

        listing.price = new_price;
        Ok(())
    }

    // Withdraw marketplace fees (only authority)
    pub fn withdraw_fees(ctx: Context<WithdrawFees>, amount: u64) -> Result<()> {
        anchor_lang::system_program::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.system_program.to_account_info(),
                anchor_lang::system_program::Transfer {
                    from: ctx.accounts.marketplace_authority.to_account_info(),
                    to: ctx.accounts.authority.to_account_info(),
                },
                &[&[
                    b"marketplace",
                    &[ctx.accounts.marketplace.bump],
                ]],
            ),
            amount,
        )?;
        Ok(())
    }
}