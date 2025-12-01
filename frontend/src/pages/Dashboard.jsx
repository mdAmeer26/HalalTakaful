import React, { useState, useEffect } from 'react'
import { User, CreditCard, FileText, TrendingUp, DollarSign } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PolicyCard from '../components/PolicyCard'
import ClaimCard from '../components/ClaimCard'
import { activePolicies, recentClaims, paymentHistory } from '../utils/dummyData'

const Dashboard = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                As-salamu alaykum, {user?.name || 'Member'}!
              </h1>
              <p className="text-primary-100">
                Manage your Takaful plans, track claims from mutual pool, and view your Tabarru contributions
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-gold-300 text-sm">Total Coverage</p>
                <p className="text-2xl font-bold">₹5.75Cr</p>
              </div>
              <div className="h-12 w-px bg-primary-400"></div>
              <div className="text-center">
                <p className="text-gold-300 text-sm">Active Policies</p>
                <p className="text-2xl font-bold">{activePolicies.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Policies</p>
                <p className="text-2xl font-bold text-gray-900">{activePolicies.length}</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-lg">
                <FileText className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="card bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">My Tabarru Donated</p>
                <p className="text-2xl font-bold text-green-600">₹1,12,050</p>
                <p className="text-xs text-gray-500">To mutual pool (6 months)</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="card bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Monthly Tabarru</p>
                <p className="text-2xl font-bold text-gray-900">₹18,675</p>
                <p className="text-xs text-gray-500">+ ₹2,075 Wakalah Fee</p>
              </div>
              <div className="p-3 bg-gold-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-gold-600" />
              </div>
            </div>
          </div>

          <div className="card bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pool Helped Others</p>
                <p className="text-2xl font-bold text-blue-600">₹8,42,000</p>
                <p className="text-xs text-gray-500">From your contributions</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Transparency Section - NEW */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border-2 border-primary-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="text-3xl mr-3">📊</span>
            Tabarru Pool Transparency
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-gray-600 mb-1">Total Pool Collected</p>
              <p className="text-3xl font-bold text-green-600">₹24.5 Cr</p>
              <p className="text-xs text-gray-500 mt-2">From all {`50,000+`} members</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Total Assistance Released</p>
              <p className="text-3xl font-bold text-blue-600">₹18.2 Cr</p>
              <p className="text-xs text-gray-500 mt-2">Helped 2,847 members</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Current Pool Balance</p>
              <p className="text-3xl font-bold text-purple-600">₹6.3 Cr</p>
              <p className="text-xs text-gray-500 mt-2">Ready to help members</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700">Pool Utilization Rate</span>
              <span className="text-sm font-bold text-primary-600">74.3%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
              <div className="bg-primary-600 h-3 rounded-full" style={{width: '74.3%'}}></div>
            </div>
            <p className="text-xs text-gray-600 mt-2">✓ Healthy pool balance maintained for member assistance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Policies */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Active Policies</h2>
                <a href="/plans" className="text-primary-600 hover:text-primary-700 font-semibold">
                  View All →
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activePolicies.map((policy) => (
                  <PolicyCard key={policy.id} policy={policy} />
                ))}
              </div>
            </div>

            {/* Recent Claims */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Claims</h2>
                <a href="/claims" className="text-primary-600 hover:text-primary-700 font-semibold">
                  View All →
                </a>
              </div>
              <div className="space-y-4">
                {recentClaims.map((claim) => (
                  <ClaimCard key={claim.id} claim={claim} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="card">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user?.name || 'Member'}</h3>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
              </div>
              <button className="w-full btn-secondary text-sm">
                Edit Profile
              </button>
            </div>

            {/* Quick Actions */}
            <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-200">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a href="/transparency" className="block w-full bg-white hover:bg-gray-50 text-primary-700 font-semibold py-3 px-4 rounded-lg transition-colors text-center shadow-sm">
                  📊 View Pool Transparency
                </a>
                <a href="/plans" className="block w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center shadow-sm">
                  🛡️ Browse Takaful Plans
                </a>
                <a href="/claims" className="block w-full bg-gold-500 hover:bg-gold-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center shadow-sm">
                  💰 Request Pool Assistance
                </a>
              </div>
            </div>

            {/* My Contribution Summary */}
            <div className="card bg-green-50 border-2 border-green-200">
              <h3 className="font-semibold text-green-900 mb-4">My Contribution Impact</h3>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Total Tabarru Donated</p>
                  <p className="text-2xl font-bold text-green-600">₹1,12,050</p>
                  <p className="text-xs text-gray-500 mt-1">Over 6 months</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Helped Fellow Members</p>
                  <p className="text-2xl font-bold text-blue-600">₹8,42,000</p>
                  <p className="text-xs text-gray-500 mt-1">From your contributions</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Members Assisted</p>
                  <p className="text-2xl font-bold text-purple-600">127</p>
                  <p className="text-xs text-gray-500 mt-1">Through shared pool</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-100 rounded-lg">
                <p className="text-xs text-green-800">
                  ✨ <strong>JazakAllah Khair!</strong> Your Tabarru donations have helped 127 fellow members in need. May Allah reward you!
                </p>
              </div>
            </div>

            {/* Payment History */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Contributions</h3>
              <div className="space-y-3">
                {paymentHistory.slice(0, 3).map((payment) => (
                  <div key={payment.id} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-medium text-gray-900">{payment.planName}</span>
                      <span className="text-sm font-semibold text-primary-600">₹{payment.amount.toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-xs text-gray-600">{new Date(payment.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-sm text-primary-600 hover:text-primary-700 font-semibold">
                View All Contributions →
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Dashboard
