import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, CheckCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FeatureCard from '../components/FeatureCard'
import TestimonialCard from '../components/TestimonialCard'
import { features, testimonials } from '../utils/dummyData'

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Shield className="h-5 w-5 text-gold-400" />
                <span className="text-sm">100% Shariah Compliant</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Islamic Mutual Protection (Takaful)
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-100">
                Not insurance—it's cooperation! Join a Shariah-compliant mutual fund where members help each other. No interest, no haram, 100% transparent.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="btn-gold flex items-center justify-center space-x-2">
                  <span>Join Mutual Pool</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link to="/plans" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center">
                  View Takaful Plans
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div>
                  <p className="text-3xl font-bold text-gold-400">50K+</p>
                  <p className="text-sm text-gray-200">Takaful Members</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gold-400">₹4,100Cr+</p>
                  <p className="text-sm text-gray-200">Mutual Pool Coverage</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gold-400">100%</p>
                  <p className="text-sm text-gray-200">Shariah Compliant</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gold-400/20 rounded-full blur-3xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=600&fit=crop"
                  alt="Happy Muslim family protected by Takaful"
                  className="relative rounded-2xl shadow-2xl object-cover w-full h-[500px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How Islamic Takaful Works
            </h2>
            <p className="text-lg text-gray-600">
              A mutual protection system based on cooperation, transparency, and Islamic principles—not traditional insurance.
            </p>
          </div>

          {/* Takaful Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-xl border border-primary-200">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">You Contribute (Tabarru)</h3>
              <p className="text-gray-700">
                Members donate to a shared pool. This is NOT a premium—it's a charitable contribution to help fellow members.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gold-50 to-gold-100 p-6 rounded-xl border border-gold-200">
              <div className="bg-gold-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Pool Helps Members</h3>
              <p className="text-gray-700">
                When you face an emergency (accident, illness, loss), the shared pool covers your expenses—mutual cooperation.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">We Earn Ethically</h3>
              <p className="text-gray-700">
                <strong>Wakalah Fee</strong> (10% service charge), <strong>Mudarabah</strong> profit share from Halal investments, and transparent operational costs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">4</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">100% Halal</h3>
              <p className="text-gray-700">
                No interest (Riba), no haram investments, no hidden charges. Fully compliant with Shariah principles.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Why Choose HalalTakaful?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <FeatureCard key={feature.id} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&h=400&fit=crop"
                alt="Muslim family with digital platform"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Complete Digital Takaful Management
              </h2>
              <p className="text-lg text-gray-600">
                Track your Tabarru contributions, submit claims to the mutual pool, and view transparent breakdowns—all from one platform.
              </p>
              <ul className="space-y-4">
                {[
                  'Real-time Takaful plan tracking',
                  'Instant claim submission to pool',
                  'View Tabarru vs Wakalah breakdown',
                  'Monitor Mudarabah investments',
                  'Shariah compliance certificates',
                  'Mobile-friendly interface'
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="btn-primary inline-flex items-center space-x-2">
                <span>Join Takaful Community</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Takaful Members Say
            </h2>
            <p className="text-lg text-gray-600">
              Real experiences from our mutual protection community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Get Protected?
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Join thousands of families who trust HalalTakaful for their insurance needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn-gold">
              Create Free Account
            </Link>
            <Link to="/plans" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Explore Plans
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Landing
