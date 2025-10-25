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

Update the remaining 3 NFTs with their asset URLs:

1. ✅ **NFT #15 - Collection 1** - Asset URL added
2. ⏳ **NFT #15 - Collection 2** - TODO: Add asset URL
3. ⏳ **NFT #11** - TODO: Add asset URL
4. ⏳ **NFT #12** - TODO: Add asset URL

## Next Steps

1. Visit each NFT on objkt.com
2. Get the direct asset URL (right-click image)
3. Update `src/data/nfts.ts` with the asset URLs
4. Add proper titles and descriptions
5. Update mint dates
