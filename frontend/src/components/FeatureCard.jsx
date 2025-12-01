import React from 'react'
import * as Icons from 'lucide-react'

const FeatureCard = ({ title, description, icon }) => {
  const IconComponent = Icons[icon] || Icons.Star

  return (
    <div className="card text-center group hover:scale-105 transition-transform duration-300">
      <div className="flex justify-center mb-4">
        <div className="p-4 bg-primary-100 rounded-full group-hover:bg-primary-200 transition-colors">
          <IconComponent className="h-8 w-8 text-primary-600" />
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export default FeatureCard
