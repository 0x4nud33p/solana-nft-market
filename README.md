# NFT Marketplace

A full-stack decentralized NFT marketplace built on Solana blockchain using Anchor framework and Next.js.

## 🛠 Tech Stack

### Blockchain
- **Solana**: High-performance blockchain platform
- **Anchor**: Rust framework for Solana program development
- **SPL Token Program**: Token standards and utilities

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Modern component library
- **React Query**: Server state management

### Development Tools
- **Anchor CLI**: Program deployment and testing
- **Solana CLI**: Blockchain interactions
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Rust and Cargo
- Solana CLI tools
- Anchor framework

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/0x4nud33p/solana-nft-market
   cd solana-nft-market
   ```

2. **Install dependencies**
   ```bash
   # Install Anchor dependencies
   npm install

   # Install frontend dependencies
   cd client
   npm install
   cd ..
   ```

3. **Configure Solana**
   ```bash
   # Set to devnet for development
   solana config set --url devnet

   # Generate a new keypair (if needed)
   solana-keygen new
   ```

4. **Build the program**
   ```bash
   anchor build
   ```

5. **Deploy to devnet**
   ```bash
   anchor deploy
   ```

6. **Run tests**
   ```bash
   anchor test
   ```

7. **Start the frontend**
   ```bash
   cd client
   npm run dev
   ```

### Environment Setup

Create a `.env.local` file in the client directory:

```env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_PROGRAM_ID=your_program_id
```

## 🔧 Configuration

### Anchor.toml
Configure your cluster settings and program deployment options.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ on Solana**