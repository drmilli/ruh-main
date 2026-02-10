# Ruh Landing Page

Modern blockchain-styled landing page for the Ruh AI Product Safety Analyzer.

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Solana Wallet Adapter** - Wallet connection
- **Lucide React** - Icons

## Features

- Animated particle/grid blockchain background
- Solana wallet connection (Phantom, Solflare)
- Modern glassmorphism UI
- Responsive design
- Token purchase section
- Interactive safety score demo

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
landingpage/
├── public/
│   └── ruh-icon.png         # App icon
├── src/
│   ├── components/
│   │   ├── AnimatedBackground.jsx  # Particle animation
│   │   ├── Navbar.jsx              # Navigation with wallet
│   │   ├── Hero.jsx                # Hero section
│   │   ├── Features.jsx            # Features grid
│   │   ├── HowItWorks.jsx          # Step-by-step guide
│   │   ├── Stats.jsx               # Statistics section
│   │   ├── TokenSection.jsx        # Buy token section
│   │   └── Footer.jsx              # Footer
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Customization

### Colors
Edit `tailwind.config.js` to modify the color palette:
- `cyber` - Cyan accent (blockchain feel)
- `neon` - Purple accent
- `dark` - Background shades
- `safe` - Success green
- `danger` - Warning/error red

### Token Configuration
Update the token address and details in `src/components/TokenSection.jsx`.

### Wallet Network
Change from devnet to mainnet in `src/App.jsx`:
```javascript
const network = 'mainnet-beta' // Change from 'devnet'
```

## License

MIT
