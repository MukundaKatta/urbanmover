# UrbanMover

Autonomous urban mobility platform with dual fleet management for robotaxis and autonomous trucks, investor dashboards, and regulatory tracking.

## Features

- **Dual Fleet View** -- Monitor both robotaxi and autonomous trucking fleets
- **Fleet Map** -- Mapbox-powered real-time vehicle tracking across the city
- **Investor Dashboard** -- Financial metrics, growth projections, and KPIs
- **Regulatory Tracker** -- Track autonomous vehicle regulations by jurisdiction
- **Vehicle Analytics** -- Per-vehicle performance, utilization, and safety metrics
- **Animated UI** -- Smooth transitions with Framer Motion

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Mapping:** Mapbox GL
- **Charts:** Recharts
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Database:** Supabase
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd urbanmover
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
urbanmover/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   │   ├── DualFleetView.tsx
│   │   ├── FleetMap.tsx
│   │   ├── InvestorDashboard.tsx
│   │   └── RegulatoryTracker.tsx
│   └── lib/              # Utilities, store, mock data
├── public/               # Static assets
└── package.json
```

