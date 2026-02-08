# Eternal Love - Interactive Valentine's Experience

A romantic, interactive website with special first-visit logic and a beautiful Valentine's Day interface.

## Features

- **First Visit Logic**: New visitors are greeted with a special question. Returning visitors see the main interface directly.
- **Interactive Question**: "Do you want to be with me only in a relationship?" with animated Yes/No options.
- **Rejection Handling**: Soft, emotional response if "No" is clicked.
- **Valentine Interface**: 
  - Floating hearts animation
  - Romantic gradient background
  - Dynamic date display
  - Music toggle (visual only)
  - Responsive design for mobile and desktop

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Storage**: localStorage (No backend required)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment

The project is configured for static export (`output: 'export'`), making it easy to deploy to:

- **Vercel**: Simply import the repository.
- **GitHub Pages**: Push to a branch and configure GitHub Pages to serve from the `out` directory (after running `npm run build`).

## Customization

### Customization

### Adding Music and Photos
1. **Music**: 
   - Open `constants/romantic.ts`.
   - Replace the `spotifyEmbedUrl` with your own Spotify Track links.
   - Format: `https://open.spotify.com/embed/track/{TRACK_ID}`.

2. **Photos**:
   - The site uses placeholders by default. 
   - To use your own, upload photos to a hosting service or place them in `public/photos` and update the URLs in `constants/romantic.ts`.

- Modify `components/ValentineInterface.tsx` to change the romantic text.
- Adjust colors in `app/globals.css` or Tailwind classes.
