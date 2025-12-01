import React from 'react'
import { Link } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { CheckCircle } from 'lucide-react'

const PlanCard = ({ plan, showEnroll = false }) => {
  const IconComponent = Icons[plan.icon] || Icons.Shield

  return (
    <div className="card hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-primary-500">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-primary-100 rounded-lg">
          <IconComponent className="h-8 w-8 text-primary-600" />
        </div>
        <span className="text-sm font-semibold px-3 py-1 bg-gold-100 text-gold-700 rounded-full">
          Shariah Certified
        </span>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
      <p className="text-gray-600 mb-4">{plan.description}</p>

      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Monthly Contribution</p>
          <p className="text-3xl font-bold text-primary-600">
            ₹{plan.monthlyContribution.toLocaleString('en-IN')}
          </p>
        </div>
        
        {/* Takaful Breakdown */}
        {plan.tabarruAmount && (
          <div className="mt-3 pt-3 border-t border-gray-200 space-y-1">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Tabarru (Donation to Pool):</span>
              <span className="font-semibold">₹{plan.tabarruAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Wakalah Fee ({plan.wakalahPercentage}%):</span>
              <span className="font-semibold">₹{plan.wakalahFee.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}
        
        <div className="text-center mt-3 pt-3 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Coverage Up To</p>
          <p className="text-xl font-semibold text-gray-800">
            ₹{plan.coverage.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <p className="font-semibold text-gray-800 mb-3">Key Benefits:</p>
        {plan.benefits.slice(0, 5).map((benefit, index) => (
          <div key={index} className="flex items-start space-x-2">
            <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700">{benefit}</span>
          </div>
        ))}
      </div>

      {showEnroll && (
        <div className="flex space-x-2">
          <button className="flex-1 btn-secondary">View Details</button>
          <button className="flex-1 btn-primary">Enroll Now</button>
        </div>
      )}
    </div>
  )
}

export default PlanCard
