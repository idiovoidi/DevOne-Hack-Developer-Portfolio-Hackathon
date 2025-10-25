# NFT Display Strategy

## Two-Tier Approach

Your NFT section uses a smart **two-tier approach** for optimal performance and UX:

### 1. Grid View - Direct Asset Images
- Uses direct image URLs from `assets.objkt.media` CDN
- Shows clean NFT artwork without objkt.com UI
- No login buttons, headers, or marketplace clutter
- Fast loading: ~50-200KB per image
- Lazy loading enabled

### 2. Lightbox View - Interactive Embed
- Full objkt.com page embedded in iframe
- Users can interact with NFT details
- View metadata, history, and marketplace info
- Only loads when user clicks to view

## How to Get Asset URLs

For each NFT on objkt.com:

1. Visit the NFT page: `https://objkt.com/tokens/CONTRACT/TOKEN_ID`
2. Right-click on the NFT image → "Open image in new tab"
3. Copy the URL (format: `https://assets.objkt.media/file/assets-XXX/IPFS_HASH/artifact`)
4. Use this URL as the `image` field in `nfts.ts`

Example:
```typescript
{
  image: "https://assets.objkt.media/file/assets-003/QmbtUvGdxFuaauaYYSBnySzEYqruaMdJ6p74kAhr5A7TN5/artifact",
  embedUrl: "https://objkt.com/tokens/KT1SJawrAnz4qnt3XLGa924WQR5Jkp95UL9K/15",
}
```

## Performance Benefits

### Grid View
```
✅ Clean thumbnails (no UI clutter)
✅ Fast CDN delivery
✅ ~50-200KB per image
✅ Lazy loading
✅ Total: ~200-800KB for 4 NFTs
```

### Lightbox
```
✅ Interactive NFT viewer
✅ Full marketplace features
✅ Only loads on user click
✅ Direct link to objkt.com
```

## Your NFTs

All 4 featured NFTs are configured:

1. ✅ **NFT #15 - Collection 1** - Asset URL added
2. ✅ **NFT #15 - Collection 2** - Asset URL added
3. ✅ **NFT #11** - Asset URL added
4. ✅ **NFT #12** - Asset URL added

## Collections

Three full collections are linked:

1. ✅ **Collection 1** - KT1SJawrAnz4qnt3XLGa924WQR5Jkp95UL9K
2. ✅ **Collection 2** - KT1D8cNYvhvoE5URCoj6Q5iPhc2EQzWaR9ew
3. ✅ **Collection 3** - KT1EQFjF1qDm99nkZvqNtw14kNb6YJAnDM5M

## Section Layout

**Featured NFTs (Top):**
- 4 hand-picked NFTs displayed prominently
- Click to view in lightbox with full objkt.com embed

**Collections (Bottom):**
- 3 collection cards with cover images
- Click to visit full collection on objkt.com
- Shows contract address
- External link icon

## Next Steps

1. Add proper titles for each NFT (replace "NFT #15 - Collection 1")
2. Add meaningful descriptions
3. Update mint dates
4. Add collection names (replace "Collection 1", "Collection 2", etc.)
5. Optionally add item counts to collections
