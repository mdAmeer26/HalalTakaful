import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary-500" />
              <span className="text-2xl font-bold text-white">HalalTakaful</span>
            </div>
            <p className="text-sm">
              Islamic mutual protection (Takaful) based on cooperation, not conventional insurance. 100% Halal, transparent, and Shariah-certified.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-primary-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-primary-500 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/plans" className="hover:text-primary-500 transition-colors">
                  Takaful Plans
                </Link>
              </li>
              <li>
                <Link to="/claims" className="hover:text-primary-500 transition-colors">
                  Submit Claim
                </Link>
              </li>
              <li>
                <a href="#about" className="hover:text-primary-500 transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary-500 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-500 transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-500 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>support@halaltakaful.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1" />
                <span>123 Takaful Street, Islamic Finance District, Dubai, UAE</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} HalalTakaful. All rights reserved. Certified Shariah Compliant.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
