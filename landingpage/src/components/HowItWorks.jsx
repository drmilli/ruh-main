import { motion } from 'framer-motion'
import { Download, Search, ScanSearch, CheckCircle } from 'lucide-react'
import productImg from '../assets/product.jpg'

const steps = [
  {
    number: '01',
    icon: Download,
    title: 'Install Extension',
    description: 'Add Ruh to Chrome with one click. No account needed, no signup required.',
  },
  {
    number: '02',
    icon: Search,
    title: 'Browse Products',
    description: 'Shop on Amazon as usual. Ruh automatically detects product pages.',
  },
  {
    number: '03',
    icon: ScanSearch,
    title: 'AI Analysis',
    description: 'Advanced AI instantly analyzes ingredients for allergens, PFAS, and toxins.',
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'Get Results',
    description: 'See your safety score, detailed findings, and make informed decisions.',
  },
]

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-32 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary font-semibold text-sm mb-4">How It Works</span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight font-display text-ink-primary">
            Get Started in <span className="text-brand-primary">Seconds</span>
          </h2>
          <p className="text-ink-secondary text-lg max-w-2xl mx-auto">
            Start protecting your health in under 30 seconds. No technical knowledge required.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-px bg-gradient-to-r from-brand-primary/30 to-transparent -translate-x-1/2 z-0" />
              )}

              {/* Card */}
              <div className="bg-white rounded-2xl p-6 text-center relative z-10 border border-gray-100 shadow-lg shadow-gray-200/50 h-full hover:translate-y-[-4px] transition-transform duration-300">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold text-sm mb-6">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-brand-primary/5 border border-brand-primary/10 mx-auto mb-5 flex items-center justify-center text-brand-primary">
                  <step.icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-ink-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-ink-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Browser Mockup Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="relative max-w-4xl mx-auto">
            {/* Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-primary/20 via-purple-500/20 to-brand-primary/20 rounded-3xl blur-xl" />

            {/* Browser Window */}
            <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-2xl">
              {/* Browser Chrome */}
              <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-500 text-sm flex items-center gap-2 shadow-sm">
                    <Search className="w-4 h-4" />
                    amazon.com/dp/B08N5WRWNW
                  </div>
                </div>
              </div>

              {/* Browser Content */}
              <div className="p-8 bg-white">
                <div className="flex gap-8 flex-col md:flex-row">
                  {/* Product Image Placeholder */}
                  <div className="w-full md:w-64 h-64 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-transparent opacity-50" />
                    <img 
                      src={productImg} 
                      alt="Product" 
                      className="w-full h-full object-cover mix-blend-multiply opacity-80"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">PureNature Organic Daily Moisturizer - Toxin Free</h3>
                      <div className="flex items-center gap-2 text-sm text-yellow-500 mb-4">
                        {[1, 2, 3, 4, 5].map(i => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-blue-600 hover:underline ml-1 cursor-pointer">12,453 ratings</span>
                      </div>
                      <div className="text-3xl font-medium text-gray-900 mb-6">$24.99</div>
                    </div>

                    <div className="space-y-3 border-t border-gray-100 pt-6">
                      <div className="h-4 bg-gray-100 rounded w-3/4" />
                      <div className="h-4 bg-gray-100 rounded w-full" />
                      <div className="h-4 bg-gray-100 rounded w-5/6" />
                    </div>

                    <div className="flex gap-4 pt-6">
                       <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 px-6 rounded-full transition-colors shadow-sm">
                         Add to Cart
                       </button>
                       <button className="flex-1 bg-orange-400 hover:bg-orange-500 text-gray-900 font-medium py-3 px-6 rounded-full transition-colors shadow-sm">
                         Buy Now
                       </button>
                    </div>


                  </div>
                </div>
              </div>

            {/* Ruh Safety Badge Overlay - Adjusted positioning to prevent overflow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-[60%] md:top-[35%] right-4 md:right-8 transform -translate-y-1/2 bg-white rounded-xl shadow-2xl border border-green-100 p-4 z-20 w-64 md:w-72"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                    <img src="/icon.png" alt="Ruh" className="w-6 h-6 object-contain" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Safety Score</h4>
                    <p className="text-xs text-gray-500">Analysis complete</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                  Safe
                </span>
              </div>
              
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-gray-900">85</span>
                <span className="text-gray-400 text-sm">/ 100</span>
              </div>
              
              <div className="w-full bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '85%' }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="bg-green-500 h-full rounded-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No harmful parabens</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>PFAS-free certified</span>
                </div>
              </div>
            </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks
