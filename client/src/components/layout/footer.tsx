import { Link } from 'wouter';
import logoPath from '@assets/logo_1753208911294.png';

export default function Footer() {
  return (
    <footer className="bg-footer-gradient-glow py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <img src={logoPath} alt="2Pbal Logo" className="h-6 sm:h-8 w-auto mb-3 sm:mb-4" />
            <p className="text-gray-400 text-sm sm:text-base">Precise Programming for Business Advancement and Leverage</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Services</h3>
            <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
              <li><Link href="/services" className="hover:text-lime-primary transition-colors">Web Development</Link></li>
              <li><Link href="/services" className="hover:text-lime-primary transition-colors">Digital Marketing</Link></li>
              <li><Link href="/services" className="hover:text-lime-primary transition-colors">AI & Automation</Link></li>
              <li><Link href="/services" className="hover:text-lime-primary transition-colors">Business Strategy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h3>
            <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
              <li><Link href="/about" className="hover:text-lime-primary transition-colors">About Us</Link></li>
              <li><Link href="/case-studies" className="hover:text-lime-primary transition-colors">Case Studies</Link></li>
              <li><Link href="/careers" className="hover:text-lime-primary transition-colors">Careers</Link></li>
              <li><Link href="/quote" className="hover:text-lime-primary transition-colors">Get Quote</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h3>
            <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
              <li className="break-all">
                <a href="mailto:infodesk@2pbal.online" className="hover:text-lime-primary transition-colors">
                  infodesk@2pbal.online
                </a>
              </li>
              <li>
                <a href="tel:+16822844934" className="hover:text-lime-primary transition-colors">
                  +1 (682) 284-4934
                </a>
              </li>
              <li>Mon-Fri 9AM-6PM EST</li>
              <li>
                <a href="mailto:recruitment@2pbal.site" className="hover:text-lime-primary transition-colors">
                  Careers: recruitment@2pbal.site
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-gray-400">
          <p className="text-xs sm:text-sm">
            &copy; 2025 2Pbal. All rights reserved. | 
            <Link href="/privacy-policy" className="hover:text-lime-primary transition-colors ml-1 mr-1">Privacy Policy</Link> | 
            Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
