# Font Setup Guide

## Current Fonts

- **Main Font**: Economica (from Google Fonts) ✅
- **Script Font**: Great Vibes (temporary placeholder for Sweetbelly Script)

## How to Add Sweetbelly Script Font

If you have the Sweetbelly Script font files, follow these steps:

### Step 1: Obtain Font Files

You'll need the Sweetbelly Script font in web font formats:
- `.woff2` (recommended, best compression)
- `.woff` (fallback for older browsers)

### Step 2: Add Font Files

1. Place your font files in the `/public/fonts/` directory:
   ```
   public/
   └── fonts/
       ├── sweetbelly-script.woff2
       └── sweetbelly-script.woff (optional)
   ```

### Step 3: Update layout.tsx

Replace the current font import in `app/layout.tsx`:

**Current (Great Vibes):**
```typescript
import { Economica, Great_Vibes } from 'next/font/google'

const scriptFont = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script'
})
```

**Change to (Sweetbelly Script):**
```typescript
import { Economica } from 'next/font/google'
import localFont from 'next/font/local'

const scriptFont = localFont({
  src: [
    {
      path: '../public/fonts/sweetbelly-script.woff2',
      weight: '400',
      style: 'normal',
    },
    // Optional fallback for older browsers
    {
      path: '../public/fonts/sweetbelly-script.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-script',
  display: 'swap',
})
```

### Step 4: Restart Dev Server

After making changes, restart your development server:
```bash
# Stop the server (Ctrl+C)
# Start it again
npm run dev
```

## Where Fonts Are Used

The script font (currently Great Vibes) is used for:
- "bonsai" in the header logo
- "bonsai" in the footer
- Any other text with the `font-script` class

## Alternative Script Fonts

If you don't have Sweetbelly Script, here are similar Google Fonts alternatives:
- Great Vibes (current) - Elegant, flowing script
- Pacifico - Casual, friendly script
- Dancing Script - Lively, bouncy script
- Satisfy - Handwritten feel
- Allura - Formal, elegant script

To change to a different Google Font, update the import in `app/layout.tsx`:
```typescript
import { Economica, Pacifico } from 'next/font/google' // Change font name here

const scriptFont = Pacifico({ // And here
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script'
})
```

## Testing Fonts

After updating fonts, check these pages:
- Home page (hero section)
- Header (logo)
- Footer (logo)
- Any page with the brand name

The site should automatically reload with the new fonts.
