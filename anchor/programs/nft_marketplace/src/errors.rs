use anchor_lang::prelude::*;

#[error_code]
pub enum MarketplaceError {
    #[msg("The listing is not active")]
    ListingNotActive,
    
    #[msg("You are not the seller of this NFT")]
    UnauthorizedSeller,
    
    #[msg("You are not the marketplace authority")]
    UnauthorizedAuthority,
    
    #[msg("Invalid price - must be greater than 0")]
    InvalidPrice,
    
    #[msg("Insufficient funds to complete purchase")]
    InsufficientFunds,
    
    #[msg("NFT is already listed")]
    AlreadyListed,
    
    #[msg("NFT is not listed")]
    NotListed,
    
    #[msg("Invalid fee percentage - must be between 0 and 1000 (10%)")]
    InvalidFeePercentage,
    
    #[msg("Cannot buy your own NFT")]
    CannotBuyOwnNft,
    
    #[msg("Metadata name too long")]
    NameTooLong,
    
    #[msg("Metadata URI too long")]
    UriTooLong,
}