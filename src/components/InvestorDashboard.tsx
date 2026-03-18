'use client'

import { useStore } from '@/lib/store'
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react'

export default function InvestorDashboard() {
  const { investorMetrics, vehicles } = useStore()

  const revenueData = Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    robotaxi: 100 + i * 30 + Math.random() * 50,
    trucking: 80 + i * 25 + Math.random() * 40,
  }))

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Investor Dashboard</h2>
        <p className="text-gray-400">Key metrics and financial performance for stakeholders</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {investorMetrics.slice(0, 4).map(m => (
          <div key={m.label} className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
            <p className="text-xs text-gray-400 mb-2">{m.label}</p>
            <p className="text-2xl font-bold">{m.value}</p>
            <div className="flex items-center gap-1 mt-2">
              {m.change > 0 ? <TrendingUp className="w-4 h-4 text-green-400" /> : <TrendingDown className="w-4 h-4 text-red-400" />}
              <span className={`text-sm ${m.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {m.change > 0 ? '+' : ''}{m.change}% {m.period}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {investorMetrics.slice(4).map(m => (
          <div key={m.label} className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
            <p className="text-xs text-gray-400 mb-2">{m.label}</p>
            <p className="text-2xl font-bold">{m.value}</p>
            <div className="flex items-center gap-1 mt-2">
              {m.change > 0 ? <TrendingUp className="w-4 h-4 text-green-400" /> : <TrendingDown className="w-4 h-4 text-red-400" />}
              <span className={`text-sm ${m.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {m.change > 0 ? '+' : ''}{m.change}% {m.period}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h3 className="text-lg font-semibold mb-4">Monthly Revenue by Division ($K)</h3>
        <div className="flex items-end gap-2 h-48">
          {revenueData.map(d => (
            <div key={d.month} className="flex-1 flex flex-col items-center justify-end h-full gap-0.5">
              <div className="w-full bg-blue-500 rounded-t" style={{ height: `${d.robotaxi / 5}%` }} />
              <div className="w-full bg-amber-500 rounded-t" style={{ height: `${d.trucking / 5}%` }} />
              <span className="text-[10px] text-gray-500 mt-1">{d.month}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-6 mt-3 justify-center">
          <div className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-500 rounded" /><span className="text-xs text-gray-400">Robotaxi</span></div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 bg-amber-500 rounded" /><span className="text-xs text-gray-400">Trucking</span></div>
        </div>
      </div>

      {/* Growth projections */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h3 className="text-lg font-semibold mb-4">Growth Projections</h3>
        <div className="grid grid-cols-3 gap-6">
          {[
            { year: 'Q2 2025', fleet: 40, revenue: '$3.8M', cities: 3 },
            { year: 'Q4 2025', fleet: 75, revenue: '$7.2M', cities: 5 },
            { year: 'Q4 2026', fleet: 200, revenue: '$24M', cities: 10 },
          ].map(p => (
            <div key={p.year} className="bg-gray-800 rounded-xl p-4">
              <p className="text-amber-400 font-medium mb-3">{p.year}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">Fleet Size</span><span className="font-medium">{p.fleet} vehicles</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Revenue</span><span className="font-medium">{p.revenue}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Markets</span><span className="font-medium">{p.cities} cities</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
