import React, { useState, useEffect } from 'react'
import { Search, Filter } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PlanCard from '../components/PlanCard'
import { takafulPlans } from '../utils/dummyData'

const Plans = () => {
  const [plans, setPlans] = useState([])
  const [filteredPlans, setFilteredPlans] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    // Fetch plans from API when backend is ready
    // const fetchPlans = async () => {
    //   try {
    //     const response = await plansAPI.getAllPlans()
    //     setPlans(response.data)
    //     setFilteredPlans(response.data)
    //   } catch (error) {
    //     console.error('Error fetching plans:', error)
    //   }
    // }
    // fetchPlans()

    // Using dummy data for now
    setPlans(takafulPlans)
    setFilteredPlans(takafulPlans)
  }, [])

  useEffect(() => {
    let filtered = plans

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(plan =>
        plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(plan =>
        plan.name.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    }

    setFilteredPlans(filtered)
  }, [searchTerm, selectedCategory, plans])

  const categories = ['all', 'health', 'life', 'auto', 'property']

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Takaful Mutual Protection Plans
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Islamic alternative to insurance. Based on mutual cooperation—not risk transfer. Your Tabarru (donation) helps fellow members in need.
          </p>
        </div>

        {/* Takaful Info Banner */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">💡 Understanding Your Contribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-gold-300 font-semibold mb-2">90% Tabarru (Donation)</p>
              <p className="text-sm text-gray-100">Goes to shared mutual pool to help members facing emergencies</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-gold-300 font-semibold mb-2">10% Wakalah Fee</p>
              <p className="text-sm text-gray-100">Service charge for managing the fund, platform costs, support</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-gold-300 font-semibold mb-2">Mudarabah Profits</p>
              <p className="text-sm text-gray-100">Pool invested in Halal avenues. Profits shared with you!</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search plans..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                className="input-field pl-10"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)} Plans
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        {filteredPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} showEnroll={true} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No plans found matching your criteria</p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
            <p className="text-lg text-primary-100 mb-6">
              Our expert advisors are here to help you find the perfect Takaful plan for your needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-gold">
                Schedule a Consultation
              </button>
              <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Plans
