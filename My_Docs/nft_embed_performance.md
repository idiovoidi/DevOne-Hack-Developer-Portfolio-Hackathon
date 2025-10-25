# NFT Embed Performance Guide

## How objkt.com Embeds Work

Your NFT section now uses **direct objkt.com iframe embeds** with excellent performance characteristics.

## Performance Breakdown

### Initial Page Load

```
Grid View (4 NFTs):
- Each iframe: ~50-100KB initial load
- Total: ~200-400KB for all 4 NFTs
- Lazy loading: Only loads when scrolled into view
- Preview only: Full media doesn't load until interaction
```

### User Interaction

```
Click NFT → Lightbox Opens:
- Larger iframe view (better detail)
- Full media loads on demand
- User can interact with NFT directly
- Link to view on objkt.com marketplace
```

## What You Get

✅ **Live NFT Previews** - Actual NFT content in grid, not static images
✅ **Lazy Loading** - Iframes only load when visible
✅ **Progressive Loading** - Preview first, full quality on interaction
✅ **Interactive** - Users can interact with NFT directly in embed
✅ **Marketplace Link** - Direct link to objkt.com for purchases

## Current Implementation

### Grid View (NFTCard.tsx)

- Shows live objkt.com embed in card
- Aspect ratio: square (matches NFT format)
- Lazy loading enabled
- Hover overlay for "View Details"

### Lightbox View (Lightbox.tsx)

- Larger embed for better viewing
- Max height: 70vh (responsive)
- "View on objkt.com" button
- Click outside to close

## Your NFTs

All 4 NFTs are configured with embedUrl:

1. KT1SJawrAnz4qnt3XLGa924WQR5Jkp95UL9K/15
2. KT1D8cNYvhvoE5URCoj6Q5iPhc2EQzWaR9ew/15
3. KT1EQFjF1qDm99nkZvqNtw14kNb6YJAnDM5M/11
4. KT1D8cNYvhvoE5URCoj6Q5iPhc2EQzWaR9ew/12

## Testing Performance

To verify performance:

1. Open DevTools → Network tab
2. Navigate to NFT section
3. Watch iframe requests load lazily
4. Check total data transfer (~200-400KB)

## Fallback

If embedUrl is not provided, the card falls back to showing the static image thumbnail. This ensures flexibility for future NFTs on different platforms.
