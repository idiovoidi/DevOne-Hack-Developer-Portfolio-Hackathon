# NFT Section Guide

## What Was Created

A dedicated NFT Gallery section has been added to your portfolio, separate from the Art Gallery.

## New Files Created

1. **src/components/sections/NFTGallery.tsx** - Main NFT gallery section component
2. **src/components/ui/NFTCard.tsx** - Individual NFT card component
3. **src/data/nfts.ts** - NFT data structure and helper functions
4. **public/nft/placeholder-[1-4].svg** - Placeholder images for NFTs

## Features

- **Dedicated Section**: NFTs now have their own section in the portfolio
- **Collection Filtering**: Filter NFTs by collection (if you have multiple)
- **Blockchain Badges**: Shows which blockchain each NFT is on (Tezos, Ethereum, etc.)
- **Interactive Cards**: Click to view full NFT with embedded viewer
- **Stats Display**: Shows total NFTs, collections, and blockchain info
- **Lightbox Integration**: Uses the same lightbox as Art Gallery for consistency

## Navigation

The navigation has been updated to include:
- **Art** - Your photography work
- **NFTs** - Your blockchain art

## How to Add More NFTs

Edit `src/data/nfts.ts` and add new entries:

```typescript
{
  id: "unique-id",
  title: "Your NFT Title",
  description: "Description of the artwork",
  image: "/nft/your-nft-thumb.webp", // Screenshot
  collection: "Collection Name",
  blockchain: "Tezos", // or "Ethereum"
  contractAddress: "KT1...",
  tokenId: "15",
  mintDate: "2024-03-15",
  marketplaceUrl: "https://objkt.com/tokens/...",
  embedUrl: "https://objkt.com/tokens/...",
  price: "5 XTZ", // Optional
  sold: false, // Optional
}
```

## Next Steps

1. **Replace Placeholders**: Add actual screenshots of your NFTs to `/public/nft/`
2. **Update Titles**: Give your NFTs proper titles instead of "NFT #X"
3. **Add Descriptions**: Write meaningful descriptions for each piece
4. **Update Dates**: Add actual mint dates
5. **Add More NFTs**: Expand your collection as you mint more

## Performance

- **Minimal impact**: ~50-100KB per NFT embed (objkt.com optimized)
- **Lazy loading**: Iframes use `loading="lazy"` attribute
- **Progressive loading**: objkt embeds show preview first, full media on interaction
- **Sandboxed**: Secure iframe implementation
- **Grid embeds**: Live NFT previews directly in the gallery grid
- **Lightbox embeds**: Larger view when clicked for better detail

## Customization

You can customize the NFT section by editing:
- **Colors**: Adjust accent colors in NFTCard.tsx
- **Layout**: Change grid columns in NFTGallery.tsx
- **Stats**: Modify the stats section to show different metrics
- **Filters**: Add more filter options (by blockchain, by date, etc.)
