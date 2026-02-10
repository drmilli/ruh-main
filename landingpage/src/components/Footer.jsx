import { motion } from 'framer-motion'
import { Github, Twitter, MessageCircle, ArrowRight } from 'lucide-react'

const footerLinks = {
  Product: [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#' },
  ],
  Resources: [
    { name: 'Documentation', href: '#' },
    { name: 'API', href: '#' },
    { name: 'Support', href: '#' },
  ],
  Company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contact', href: '#' },
  ],
  Legal: [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
  ],
}

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: MessageCircle, href: '#', label: 'Discord' },
]

const Footer = () => {
  return (
    <footer className="relative pt-32 pb-12 px-4 border-t border-gray-100">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="relative inline-block w-full max-w-4xl">
            <div className="relative bg-white border border-gray-100 rounded-3xl p-10 md:p-14 overflow-hidden shadow-2xl shadow-gray-200/50">
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-ink-primary mb-4 tracking-tight font-display">
                  Ready to Shop Safely?
                </h2>
                <p className="text-ink-secondary text-lg mb-8 max-w-xl mx-auto font-medium">
                  Join thousands of health-conscious shoppers using AI to make smarter product choices.
                </p>
                <motion.a
                  href="https://chrome.google.com/webstore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold text-[15px] rounded-xl shadow-lg shadow-indigo-200 transition-all duration-300 hover:bg-indigo-700 hover:scale-105 active:scale-95"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Install Extension
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                <p className="text-ink-secondary/60 text-sm mt-4 font-medium">
                  Free forever · No account needed · 100% privacy
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <a href="#" className="flex items-center gap-3 mb-4">
              <img src="/icon.png" alt="Ruh" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold text-ink-primary font-display">Ruh</span>
            </a>
            <p className="text-ink-secondary text-sm mb-6 max-w-xs">
              AI-powered product safety analysis. Protecting your health, one product at a time.
            </p>

            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 border border-transparent flex items-center justify-center text-ink-secondary hover:text-brand-primary transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-medium mb-4 text-sm">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Ruh. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span>Built on</span>
              <span className="text-purple-400 font-medium">Solana</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
