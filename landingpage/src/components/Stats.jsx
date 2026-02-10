import React from 'react'
import { motion } from 'framer-motion'

const stats = [
  { value: '10K+', label: 'Products Analyzed', suffix: '' },
  { value: '99.2', label: 'AI Accuracy', suffix: '%' },
  { value: '5K+', label: 'Active Users', suffix: '' },
  { value: '< 3', label: 'Seconds per Analysis', suffix: 's' },
]

const Stats = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Stats Grid */}
          <div className="relative bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-xl shadow-gray-200/50">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                    className="text-4xl md:text-5xl font-bold text-brand-primary mb-2"
                  >
                    {stat.value}
                    <span className="text-brand-secondary">{stat.suffix}</span>
                  </motion.div>
                  <p className="text-ink-secondary font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stats
