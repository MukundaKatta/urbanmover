'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { FileText, CheckCircle, Clock, AlertCircle, XCircle, Filter } from 'lucide-react'

const statusIcons = { approved: CheckCircle, pending: Clock, under_review: AlertCircle, rejected: XCircle }
const statusColors = { approved: 'text-green-400 bg-green-600/20', pending: 'text-yellow-400 bg-yellow-600/20', under_review: 'text-blue-400 bg-blue-600/20', rejected: 'text-red-400 bg-red-600/20' }
const impactColors = { low: 'text-green-400', medium: 'text-yellow-400', high: 'text-red-400' }

export default function RegulatoryTracker() {
  const { regulations } = useStore()
  const [typeFilter, setTypeFilter] = useState('all')

  const filtered = typeFilter === 'all' ? regulations : regulations.filter(r => r.type === typeFilter || r.type === 'both')

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Regulatory Tracker</h2>
          <p className="text-gray-400">Track AV regulations across jurisdictions</p>
        </div>
        <div className="flex gap-4">
          {(['approved', 'pending', 'under_review', 'rejected'] as const).map(s => {
            const count = regulations.filter(r => r.status === s).length
            const Icon = statusIcons[s]
            return (
              <div key={s} className="bg-gray-800 rounded-xl px-3 py-2 text-center">
                <Icon className={`w-4 h-4 mx-auto mb-1 ${statusColors[s].split(' ')[0]}`} />
                <p className="text-lg font-bold">{count}</p>
                <p className="text-[10px] text-gray-400 capitalize">{s.replace('_', ' ')}</p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex gap-2">
        {['all', 'robotaxi', 'trucking'].map(t => (
          <button key={t} onClick={() => setTypeFilter(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${typeFilter === t ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-400'}`}>
            {t === 'all' ? 'All Types' : t}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(reg => {
          const Icon = statusIcons[reg.status]
          return (
            <div key={reg.id} className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${statusColors[reg.status].split(' ').slice(1).join(' ')}`}>
                    <Icon className={`w-5 h-5 ${statusColors[reg.status].split(' ')[0]}`} />
                  </div>
                  <div>
                    <h3 className="font-medium">{reg.description}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-gray-400">{reg.jurisdiction}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${reg.type === 'robotaxi' ? 'bg-blue-600/20 text-blue-400' : reg.type === 'trucking' ? 'bg-amber-600/20 text-amber-400' : 'bg-purple-600/20 text-purple-400'}`}>
                        {reg.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm capitalize ${statusColors[reg.status].split(' ')[0]}`}>{reg.status.replace('_', ' ')}</p>
                  <p className="text-xs text-gray-400 mt-1">Deadline: {new Date(reg.deadline).toLocaleDateString()}</p>
                  <p className={`text-xs mt-1 ${impactColors[reg.impact]}`}>Impact: {reg.impact}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
