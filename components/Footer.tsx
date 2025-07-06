
import React from 'react';
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon } from './Icons';

const Footer: React.FC = () => {
  const footerLinkGroups = [
    {
      title: 'Get to Know Us',
      links: ['About GemStore', 'Careers', 'Press Releases', 'Gemini Science'],
    },
    {
      title: 'Make Money with Us',
      links: ['Sell on GemStore', 'Become an Affiliate', 'Advertise Your Products', 'Host a GemStore Hub'],
    },
    {
      title: 'Let Us Help You',
      links: ['Your Account', 'Your Orders', 'Shipping & Returns', 'Help Center'],
    },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle the subscription logic here
    alert('Thank you for subscribing!');
  };

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {footerLinkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-bold text-lg mb-4 text-brand-secondary">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="font-bold text-lg mb-4 text-brand-secondary">Connect & Subscribe</h3>
            <p className="text-gray-300 mb-4">Get the latest deals and product news.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                aria-label="Email for newsletter"
                required
                className="w-full px-4 py-2 rounded-md bg-brand-dark border border-gray-500 focus:ring-2 focus:ring-brand-secondary focus:outline-none text-white placeholder-gray-400"
              />
              <button 
                type="submit"
                className="bg-brand-secondary text-brand-dark font-bold py-2 px-4 rounded-md hover:bg-amber-400 transition-colors duration-200 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <div className="flex space-x-4 mt-6">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors"><FacebookIcon className="h-6 w-6" /></a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors"><TwitterIcon className="h-6 w-6" /></a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors"><InstagramIcon className="h-6 w-6" /></a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors"><LinkedInIcon className="h-6 w-6" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8 text-center text-sm text-gray-400">
            <p className="font-bold text-xl text-white mb-2 cursor-default">GemStore</p>
            <div className="space-x-4 mb-4">
                <a href="#" className="hover:text-white transition-colors">Conditions of Use</a>
                <span className="cursor-default">&bull;</span>
                <a href="#" className="hover:text-white transition-colors">Privacy Notice</a>
                <span className="cursor-default">&bull;</span>
                <a href="#" className="hover:text-white transition-colors">Your Ads Privacy Choices</a>
            </div>
            <p>&copy; {new Date().getFullYear()}, GemStore.com, Inc. or its affiliates</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
