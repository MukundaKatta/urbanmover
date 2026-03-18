'use client'

import { useStore } from '@/lib/store'
import { Truck, Car, MapPin, TrendingUp, FileText } from 'lucide-react'
import DualFleetView from '@/components/DualFleetView'
import InvestorDashboard from '@/components/InvestorDashboard'
import RegulatoryTracker from '@/components/RegulatoryTracker'
import FleetMap from '@/components/FleetMap'

const tabs = [
  { id: 'fleet', label: 'Dual Fleet View', icon: Car },
  { id: 'map', label: 'Fleet Map', icon: MapPin },
  { id: 'investor', label: 'Investor Dashboard', icon: TrendingUp },
  { id: 'regulatory', label: 'Regulatory Tracker', icon: FileText },
]

export default function HomePage() {
  const { activeTab, setActiveTab, vehicles } = useStore()
  const taxiCount = vehicles.filter(v => v.fleet === 'robotaxi').length
  const truckCount = vehicles.filter(v => v.fleet === 'trucking').length

  const render = () => {
    switch (activeTab) {
      case 'fleet': return <DualFleetView />
      case 'map': return <FleetMap />
      case 'investor': return <InvestorDashboard />
      case 'regulatory': return <RegulatoryTracker />
      default: return <DualFleetView />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">UrbanMover</h1>
              <p className="text-xs text-gray-400">Multi-Modal AV</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-amber-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}>
              <tab.icon className="w-5 h-5" /> {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800 space-y-2">
          <div className="bg-gray-800 rounded-xl p-3 flex items-center gap-3">
            <Car className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-sm font-bold">{taxiCount} Robotaxis</p>
              <p className="text-[10px] text-gray-400">{vehicles.filter(v => v.fleet === 'robotaxi' && v.status === 'active').length} active</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-3 flex items-center gap-3">
            <Truck className="w-5 h-5 text-amber-400" />
            <div>
              <p className="text-sm font-bold">{truckCount} Trucks</p>
              <p className="text-[10px] text-gray-400">{vehicles.filter(v => v.fleet === 'trucking' && v.status === 'active').length} active</p>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{render()}</main>
    </div>
  )
}
