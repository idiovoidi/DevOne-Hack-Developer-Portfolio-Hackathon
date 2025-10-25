# NFT Integration Guide

## What Was Added

Your portfolio now supports embedding NFTs from objkt.com (or other marketplaces) directly in your art gallery.

## Performance Impact

**Minimal** - Each NFT embed:
- Loads only a preview initially (~50-100KB)
- Full content loads on user interaction
- Uses lazy loading
- Sandboxed iframe for security

## How It Works

1. **Data Structure**: Added `nftUrl` and `embedUrl` fields to `ArtPiece` interface
2. **Lightbox**: Updated to detect NFT embeds and render iframe instead of image
3. **Art Gallery**: Passes NFT data to lightbox automatically

## Your NFTs Added

Four NFTs from objkt.com have been added to `src/data/artworks.ts`:
- KT1SJawrAnz4qnt3XLGa924WQR5Jkp95UL9K/15
- KT1D8cNYvhvoE5URCoj6Q5iPhc2EQzWaR9ew/15
- KT1EQFjF1qDm99nkZvqNtw14kNb6YJAnDM5M/11
- KT1D8cNYvhvoE5URCoj6Q5iPhc2EQzWaR9ew/12

## Next Steps

1. **Add Titles**: Update the generic "NFT #X" titles with actual artwork names
2. **Add Thumbnails**: Replace `/art/placeholder.svg` with actual screenshots
3. **Add Dates**: Update mint dates from "2024" to actual dates
4. **Add Descriptions**: Add meaningful descriptions for each NFT

## Adding More NFTs

```typescript
{
  id: "unique-id",
  title: "Your NFT Title",
  description: "Description of the artwork",
  image: "/art/nft-thumbnail.webp", // Screenshot of the NFT
  medium: "Digital Art / NFT",
  tools: ["Tezos", "objkt.com"],
  date: "2024-03",
  category: "NFT",
  nftUrl: "https://objkt.com/tokens/CONTRACT_ADDRESS/TOKEN_ID",
  embedUrl: "https://objkt.com/tokens/CONTRACT_ADDRESS/TOKEN_ID",
}
```

## How Users See It

- Grid view: Shows thumbnail (or placeholder)
- Click artwork: Opens lightbox with embedded NFT viewer
- "View on objkt.com" link: Takes them to the marketplace
