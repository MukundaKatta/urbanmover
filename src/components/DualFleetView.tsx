'use client'

import { useStore } from '@/lib/store'
import { Car, Truck, Battery, Gauge, Package } from 'lucide-react'

export default function DualFleetView() {
  const { vehicles, fleetView, setFleetView } = useStore()

  const filtered = fleetView === 'all' ? vehicles : vehicles.filter(v => v.fleet === fleetView)
  const taxis = vehicles.filter(v => v.fleet === 'robotaxi')
  const trucks = vehicles.filter(v => v.fleet === 'trucking')

  const statusColors = { active: 'bg-green-500', idle: 'bg-yellow-500', charging: 'bg-blue-500', maintenance: 'bg-orange-500' }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dual Fleet Overview</h2>
          <p className="text-gray-400">Combined robotaxi and trucking fleet operations</p>
        </div>
        <div className="flex gap-2">
          {(['all', 'robotaxi', 'trucking'] as const).map(v => (
            <button key={v} onClick={() => setFleetView(v)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${fleetView === v ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-400'}`}>
              {v === 'all' ? 'All Vehicles' : v === 'robotaxi' ? 'Robotaxis' : 'Trucks'}
            </button>
          ))}
        </div>
      </div>

      {/* Side by side fleet stats */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-2xl border border-blue-800/30 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center"><Car className="w-5 h-5" /></div>
            <h3 className="text-lg font-semibold">Robotaxi Fleet</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-800 rounded-xl p-3"><p className="text-xs text-gray-400">Total</p><p className="text-xl font-bold">{taxis.length}</p></div>
            <div className="bg-gray-800 rounded-xl p-3"><p className="text-xs text-gray-400">Active</p><p className="text-xl font-bold text-green-400">{taxis.filter(t => t.status === 'active').length}</p></div>
            <div className="bg-gray-800 rounded-xl p-3"><p className="text-xs text-gray-400">Avg Battery</p><p className="text-xl font-bold">{(taxis.reduce((s, t) => s + t.battery, 0) / taxis.length).toFixed(0)}%</p></div>
            <div className="bg-gray-800 rounded-xl p-3"><p className="text-xs text-gray-400">Avg Speed</p><p className="text-xl font-bold">{(taxis.reduce((s, t) => s + t.speed, 0) / taxis.length).toFixed(0)} mph</p></div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-amber-800/30 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center"><Truck className="w-5 h-5" /></div>
            <h3 className="text-lg font-semibold">Trucking Fleet</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-800 rounded-xl p-3"><p className="text-xs text-gray-400">Total</p><p className="text-xl font-bold">{trucks.length}</p></div>
            <div className="bg-gray-800 rounded-xl p-3"><p className="text-xs text-gray-400">Active</p><p className="text-xl font-bold text-green-400">{trucks.filter(t => t.status === 'active').length}</p></div>
            <div className="bg-gray-800 rounded-xl p-3"><p className="text-xs text-gray-400">Avg Battery</p><p className="text-xl font-bold">{(trucks.reduce((s, t) => s + t.battery, 0) / trucks.length).toFixed(0)}%</p></div>
            <div className="bg-gray-800 rounded-xl p-3"><p className="text-xs text-gray-400">Avg Speed</p><p className="text-xl font-bold">{(trucks.reduce((s, t) => s + t.speed, 0) / trucks.length).toFixed(0)} mph</p></div>
          </div>
        </div>
      </div>

      {/* Vehicle list */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Vehicle</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Fleet</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Battery</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Speed</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Cargo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filtered.map(v => (
              <tr key={v.id} className="hover:bg-gray-800/50">
                <td className="px-4 py-3 text-sm font-medium">{v.name}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${v.fleet === 'robotaxi' ? 'bg-blue-600/20 text-blue-400' : 'bg-amber-600/20 text-amber-400'}`}>
                    {v.fleet}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${statusColors[v.status]}`} />
                  <span className="text-sm capitalize">{v.status}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-700 rounded-full h-2">
                      <div className="h-2 rounded-full" style={{ width: `${v.battery}%`, backgroundColor: v.battery > 50 ? '#22c55e' : '#eab308' }} />
                    </div>
                    <span className="text-xs">{v.battery.toFixed(0)}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{v.speed.toFixed(0)} mph</td>
                <td className="px-4 py-3 text-sm text-gray-400">{v.cargo || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
