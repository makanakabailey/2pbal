import { Link } from 'wouter';
import logoPath from '@assets/logo_1753208911294.png';

export default function Footer() {
  return (
    <footer className="bg-footer-gradient-glow py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <img src={logoPath} alt="2Pbal Logo" className="h-8 w-auto mb-4" />
            <p className="text-gray-400">Precise Programming for Business Advancement and Leverage</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/services" className="hover:text-lime-primary">Web Development</Link></li>
              <li><Link href="/services" className="hover:text-lime-primary">Digital Marketing</Link></li>
              <li><Link href="/services" className="hover:text-lime-primary">AI & Automation</Link></li>
              <li><Link href="/services" className="hover:text-lime-primary">Business Strategy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-lime-primary">About Us</Link></li>
              <li><Link href="/" className="hover:text-lime-primary">Case Studies</Link></li>
              <li><Link href="/" className="hover:text-lime-primary">Careers</Link></li>
              <li><Link href="/quote" className="hover:text-lime-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>hello@2pbal.com</li>
              <li>+1 (555) 123-4567</li>
              <li>Mon-Fri 9AM-6PM EST</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 2Pbal. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
