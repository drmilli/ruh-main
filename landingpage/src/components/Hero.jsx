import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm font-mono text-xs uppercase tracking-wider">
              <span className="flex h-2 w-2 rounded-full bg-brand-primary animate-pulse"></span>
              <span className="text-ink-secondary">System Online</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-[72px] font-bold leading-tight mb-8 tracking-tight text-ink-primary font-display"
          >
            Shop Smarter.
            <br />
            Live <span className="text-brand-primary">Safer</span>.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-ink-secondary max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Instantly detect allergens, PFAS, and harmful substances while you shop on Amazon.
            Your personal AI safety assistant.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="https://chrome.google.com/webstore"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-[15px] rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShieldCheck className="w-5 h-5" />
              Add to Chrome - It's Free
            </motion.a>

            <motion.a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 border border-gray-200 text-ink-primary font-semibold text-[15px] rounded-xl transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              How It Works
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
