import React from 'react'

const TestimonialCard = ({ name, role, image, text }) => {
  return (
    <div className="card">
      <div className="flex items-center mb-4">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
      <p className="text-gray-700 italic">"{text}"</p>
      <div className="flex mt-4 text-gold-500">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
    </div>
  )
}

export default TestimonialCard
