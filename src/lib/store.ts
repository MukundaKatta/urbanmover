import { create } from 'zustand'

export interface Vehicle {
  id: string; name: string; fleet: 'robotaxi' | 'trucking'
  status: 'active' | 'idle' | 'charging' | 'maintenance'
  lat: number; lng: number; battery: number; speed: number; cargo?: string
}

export interface Regulation {
  id: string; jurisdiction: string; status: 'approved' | 'pending' | 'under_review' | 'rejected'
  type: 'robotaxi' | 'trucking' | 'both'; description: string; deadline: string; impact: 'low' | 'medium' | 'high'
}

export interface InvestorMetric {
  label: string; value: string; change: number; period: string
}

const taxis: Vehicle[] = Array.from({ length: 15 }, (_, i) => ({
  id: `taxi-${i + 1}`, name: `UrbanTaxi-${String(i + 1).padStart(3, '0')}`, fleet: 'robotaxi',
  status: (['active', 'idle', 'charging', 'maintenance'] as const)[i % 4],
  lat: 37.77 + (Math.random() - 0.5) * 0.06, lng: -122.42 + (Math.random() - 0.5) * 0.06,
  battery: 30 + Math.random() * 70, speed: Math.random() * 35,
}))

const trucks: Vehicle[] = Array.from({ length: 10 }, (_, i) => ({
  id: `truck-${i + 1}`, name: `UrbanHaul-${String(i + 1).padStart(3, '0')}`, fleet: 'trucking',
  status: (['active', 'active', 'idle', 'charging'] as const)[i % 4],
  lat: 37.77 + (Math.random() - 0.5) * 0.08, lng: -122.42 + (Math.random() - 0.5) * 0.08,
  battery: 40 + Math.random() * 60, speed: Math.random() * 55,
  cargo: ['Electronics', 'Food & Beverage', 'Medical Supplies', 'Retail Goods', 'Construction'][i % 5],
}))

const regulations: Regulation[] = [
  { id: 'r1', jurisdiction: 'California', status: 'approved', type: 'robotaxi', description: 'Driverless taxi operation permitted in SF', deadline: '2025-01-01', impact: 'high' },
  { id: 'r2', jurisdiction: 'California', status: 'pending', type: 'trucking', description: 'AV trucking on interstate highways', deadline: '2025-06-01', impact: 'high' },
  { id: 'r3', jurisdiction: 'Texas', status: 'approved', type: 'both', description: 'Full AV operation without human backup', deadline: '2024-12-01', impact: 'medium' },
  { id: 'r4', jurisdiction: 'New York', status: 'under_review', type: 'robotaxi', description: 'Manhattan AV testing permit', deadline: '2025-09-01', impact: 'high' },
  { id: 'r5', jurisdiction: 'Federal (NHTSA)', status: 'pending', type: 'both', description: 'National AV safety framework update', deadline: '2025-12-01', impact: 'high' },
  { id: 'r6', jurisdiction: 'Arizona', status: 'approved', type: 'robotaxi', description: 'Commercial driverless operation', deadline: '2024-06-01', impact: 'medium' },
  { id: 'r7', jurisdiction: 'Florida', status: 'under_review', type: 'trucking', description: 'AV truck platooning regulations', deadline: '2025-03-01', impact: 'low' },
]

const investorMetrics: InvestorMetric[] = [
  { label: 'Total Revenue', value: '$2.4M', change: 32, period: 'MoM' },
  { label: 'Fleet Size', value: '25', change: 8, period: 'QoQ' },
  { label: 'Rides Completed', value: '48.2K', change: 45, period: 'MoM' },
  { label: 'Miles Driven', value: '1.2M', change: 28, period: 'MoM' },
  { label: 'Cost per Mile', value: '$0.42', change: -12, period: 'QoQ' },
  { label: 'Safety Score', value: '99.1%', change: 0.3, period: 'MoM' },
  { label: 'Customer NPS', value: '72', change: 5, period: 'QoQ' },
  { label: 'Valuation', value: '$850M', change: 15, period: 'QoQ' },
]

interface AppState {
  activeTab: string; vehicles: Vehicle[]; regulations: Regulation[]; investorMetrics: InvestorMetric[]
  fleetView: 'all' | 'robotaxi' | 'trucking'; setActiveTab: (t: string) => void; setFleetView: (v: 'all' | 'robotaxi' | 'trucking') => void
}

export const useStore = create<AppState>((set) => ({
  activeTab: 'fleet', vehicles: [...taxis, ...trucks], regulations, investorMetrics,
  fleetView: 'all',
  setActiveTab: (t) => set({ activeTab: t }),
  setFleetView: (v) => set({ fleetView: v }),
}))
