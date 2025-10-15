import { Link } from 'react-router';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Cartify</h2>
            <p className="text-gray-400 mb-4">
              Your one-stop shop for all your needs. Discover the best products at unbeatable prices with Cartify.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook className="text-2xl hover:text-blue-500 transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter className="text-2xl hover:text-blue-400 transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="text-2xl hover:text-pink-500 transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin className="text-2xl hover:text-blue-600 transition-colors" />
              </a>
            </div>
          </div>

          {/* Customer Service Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <p to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </p>
              </li>
              <li>
                <p to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQs
                </p>
              </li>
              <li>
                <p to="/returns" className="text-gray-400 hover:text-white transition-colors">
                  Returns & Refunds
                </p>
              </li>
              <li>
                <p to="/shipping" className="text-gray-400 hover:text-white transition-colors">
                  Shipping Information
                </p>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <p to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </p>
              </li>
              <li>
                <p to="/careers" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </p>
              </li>
              <li>
                <p to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </p>
              </li>
              <li>
                <p to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </p>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Join Our Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Stay updated with the latest deals and products!
            </p>
            <form className="flex flex-col gap-2 overflow-x-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Cartify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;