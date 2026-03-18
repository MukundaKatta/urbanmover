'use client'

import { useStore } from '@/lib/store'
import { Car, Truck, MapPin } from 'lucide-react'

export default function FleetMap() {
  const { vehicles, fleetView, setFleetView } = useStore()
  const filtered = fleetView === 'all' ? vehicles : vehicles.filter(v => v.fleet === fleetView)

  return (
    <div className="h-full relative bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <svg className="w-full h-full opacity-10">
          {Array.from({ length: 20 }, (_, i) => (
            <line key={i} x1="0" y1={`${i * 5}%`} x2="100%" y2={`${i * 5}%`} stroke="#f59e0b" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 20 }, (_, i) => (
            <line key={`v${i}`} x1={`${i * 5}%`} y1="0" x2={`${i * 5}%`} y2="100%" stroke="#f59e0b" strokeWidth="0.5" />
          ))}
        </svg>

        {filtered.map((v, i) => {
          const x = ((v.lng + 122.46) / 0.12) * 100
          const y = ((37.81 - v.lat) / 0.12) * 100
          const Icon = v.fleet === 'robotaxi' ? Car : Truck
          const color = v.fleet === 'robotaxi' ? '#3b82f6' : '#f59e0b'
          return (
            <div key={v.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${Math.min(95, Math.max(5, x))}%`, top: `${Math.min(95, Math.max(5, y))}%` }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}60` }}>
                <Icon className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] text-gray-400 opacity-0 group-hover:opacity-100">
                {v.name}
              </div>
            </div>
          )
        })}
      </div>

      <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
        <p className="text-sm font-medium">UrbanMover Fleet Map</p>
        <p className="text-xs text-amber-400 mt-1">Mapbox GL integration ready</p>
      </div>

      <div className="absolute top-4 right-4 flex gap-2">
        {(['all', 'robotaxi', 'trucking'] as const).map(v => (
          <button key={v} onClick={() => setFleetView(v)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${fleetView === v ? 'bg-amber-600 text-white' : 'bg-gray-800/80 text-gray-400'}`}>
            {v === 'all' ? 'All' : v === 'robotaxi' ? 'Taxis' : 'Trucks'}
          </button>
        ))}
      </div>

      <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-sm rounded-xl p-3 border border-gray-700">
        <div className="flex gap-4">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500" /><span className="text-xs text-gray-300">Robotaxi</span></div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500" /><span className="text-xs text-gray-300">Truck</span></div>
        </div>
      </div>
    </div>
  )
}
