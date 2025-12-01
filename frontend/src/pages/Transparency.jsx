import React from 'react'
import { TrendingUp, Users, DollarSign, Activity, CheckCircle, Clock } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Transparency = () => {
  // Sample data - will come from API in production
  const poolStats = {
    totalCollected: 245000000, // ₹24.5 Cr
    totalReleased: 182000000,  // ₹18.2 Cr
    currentBalance: 63000000,   // ₹6.3 Cr
    totalMembers: 50234,
    helpedMembers: 2847,
    pendingClaims: 156,
    approvedThisMonth: 234,
    rejectedThisMonth: 12
  }

  const recentAssistance = [
    { id: 1, member: 'Member #12453', type: 'Health', amount: 425000, date: '2024-11-28', reason: 'Heart surgery' },
    { id: 2, member: 'Member #45782', type: 'Accident', amount: 185000, date: '2024-11-27', reason: 'Vehicle accident treatment' },
    { id: 3, member: 'Member #33421', type: 'Health', amount: 312000, date: '2024-11-26', reason: 'Maternity care' },
    { id: 4, member: 'Member #67234', type: 'Property', amount: 550000, date: '2024-11-25', reason: 'Fire damage repair' },
    { id: 5, member: 'Member #89123', type: 'Health', amount: 98000, date: '2024-11-24', reason: 'Emergency surgery' },
  ]

  const monthlyBreakdown = [
    { month: 'Nov 2024', collected: 20500000, released: 18200000, balance: 2300000 },
    { month: 'Oct 2024', collected: 20200000, released: 16800000, balance: 3400000 },
    { month: 'Sep 2024', collected: 19800000, released: 15500000, balance: 4300000 },
    { month: 'Aug 2024', collected: 20100000, released: 17200000, balance: 2900000 },
    { month: 'Jul 2024', collected: 19900000, released: 14900000, balance: 5000000 },
    { month: 'Jun 2024', collected: 20300000, released: 16400000, balance: 3900000 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Complete Transparency Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See exactly how your Tabarru contributions are collected and used to help fellow members. 
            100% transparent, real-time data from the mutual pool.
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-10 w-10" />
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Total Pool</span>
            </div>
            <p className="text-3xl font-bold mb-1">₹{(poolStats.totalCollected / 10000000).toFixed(1)} Cr</p>
            <p className="text-green-100 text-sm">Collected from all members</p>
            <p className="text-xs text-green-200 mt-2">From {poolStats.totalMembers.toLocaleString('en-IN')} Takaful members</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-10 w-10" />
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Assistance</span>
            </div>
            <p className="text-3xl font-bold mb-1">₹{(poolStats.totalReleased / 10000000).toFixed(1)} Cr</p>
            <p className="text-blue-100 text-sm">Released to help members</p>
            <p className="text-xs text-blue-200 mt-2">Helped {poolStats.helpedMembers.toLocaleString('en-IN')} members in need</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="h-10 w-10" />
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Available</span>
            </div>
            <p className="text-3xl font-bold mb-1">₹{(poolStats.currentBalance / 10000000).toFixed(1)} Cr</p>
            <p className="text-purple-100 text-sm">Current pool balance</p>
            <p className="text-xs text-purple-200 mt-2">Ready for member assistance</p>
          </div>
        </div>

        {/* Utilization Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pool Utilization</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Total Collected</span>
                <span className="text-sm font-bold text-green-600">₹{(poolStats.totalCollected / 10000000).toFixed(2)} Cr</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{width: '100%'}}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Released to Members</span>
                <span className="text-sm font-bold text-blue-600">₹{(poolStats.totalReleased / 10000000).toFixed(2)} Cr ({((poolStats.totalReleased / poolStats.totalCollected) * 100).toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full" style={{width: `${(poolStats.totalReleased / poolStats.totalCollected) * 100}%`}}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Current Balance (Reserve)</span>
                <span className="text-sm font-bold text-purple-600">₹{(poolStats.currentBalance / 10000000).toFixed(2)} Cr ({((poolStats.currentBalance / poolStats.totalCollected) * 100).toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-purple-500 h-3 rounded-full" style={{width: `${(poolStats.currentBalance / poolStats.totalCollected) * 100}%`}}></div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              ✓ <strong>Healthy Pool Status:</strong> {((poolStats.currentBalance / poolStats.totalCollected) * 100).toFixed(1)}% reserve maintained ensures we can help members immediately when they need assistance.
            </p>
          </div>
        </div>

        {/* Monthly Breakdown */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Monthly Breakdown (Last 6 Months)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collected</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Released</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {monthlyBreakdown.map((month, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{month.month}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">₹{(month.collected / 10000000).toFixed(2)} Cr</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">₹{(month.released / 10000000).toFixed(2)} Cr</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600 font-semibold">₹{(month.balance / 10000000).toFixed(2)} Cr</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{((month.released / month.collected) * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Assistance */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Assistance from Pool</h2>
          <div className="space-y-4">
            {recentAssistance.map((assist) => (
              <div key={assist.id} className="border-l-4 border-primary-500 bg-gray-50 p-4 rounded-r-lg">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <p className="font-semibold text-gray-900">{assist.member}</p>
                    <p className="text-sm text-gray-600">{assist.reason}</p>
                    <p className="text-xs text-gray-500 mt-1">Type: {assist.type} • Date: {assist.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary-600">₹{assist.amount.toLocaleString('en-IN')}</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Released from Pool
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Claims Processing Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-yellow-50 border-2 border-yellow-200">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-8 w-8 text-yellow-600" />
              <span className="text-3xl font-bold text-yellow-700">{poolStats.pendingClaims}</span>
            </div>
            <p className="text-sm font-semibold text-yellow-800">Pending Verification</p>
            <p className="text-xs text-yellow-600 mt-1">Under review by verification team</p>
          </div>

          <div className="card bg-green-50 border-2 border-green-200">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <span className="text-3xl font-bold text-green-700">{poolStats.approvedThisMonth}</span>
            </div>
            <p className="text-sm font-semibold text-green-800">Approved This Month</p>
            <p className="text-xs text-green-600 mt-1">Assistance released to members</p>
          </div>

          <div className="card bg-red-50 border-2 border-red-200">
            <div className="flex items-center justify-between mb-2">
              <Activity className="h-8 w-8 text-red-600" />
              <span className="text-3xl font-bold text-red-700">{poolStats.rejectedThisMonth}</span>
            </div>
            <p className="text-sm font-semibold text-red-800">Rejected This Month</p>
            <p className="text-xs text-red-600 mt-1">Incomplete documentation</p>
          </div>
        </div>

        {/* Transparency Commitment */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Our Transparency Commitment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-gold-300">✓ Real-Time Updates</h3>
              <p className="text-sm text-gray-100">Pool statistics updated daily. You can see exactly how much is collected and released.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gold-300">✓ Member Privacy Protected</h3>
              <p className="text-sm text-gray-100">Member identities kept confidential. Only member numbers shown in assistance records.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gold-300">✓ Detailed Breakdown</h3>
              <p className="text-sm text-gray-100">Every rupee tracked. See monthly collected vs released amounts with complete transparency.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gold-300">✓ Audit Trail</h3>
              <p className="text-sm text-gray-100">All transactions recorded. External Shariah audit conducted quarterly.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Transparency
