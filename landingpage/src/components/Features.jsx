import { motion } from 'framer-motion'
import {
  Shield,
  Zap,
  Database,
  Brain,
  Lock,
  AlertTriangle,
  ArrowRight
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced AI analyzes ingredients and materials with 99.2% accuracy to detect harmful substances instantly.',
    color: 'blue',
  },
  {
    icon: AlertTriangle,
    title: 'Allergen Detection',
    description: 'Identifies 8+ major allergens including nuts, dairy, gluten, soy, and shellfish with severity levels.',
    color: 'yellow',
  },
  {
    icon: Shield,
    title: 'PFAS Screening',
    description: 'Detects "forever chemicals" linked to cancer, thyroid disease, and immune system damage.',
    color: 'red',
  },
  {
    icon: Database,
    title: 'Verified Database',
    description: 'Cross-references products against comprehensive safety databases with transparent verification.',
    color: 'purple',
  },
  {
    icon: Zap,
    title: 'Real-Time Results',
    description: 'Get instant safety scores as you browse Amazon. No waiting, no manual research needed.',
    color: 'green',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'Your browsing data never leaves your device. Analysis happens securely without tracking.',
    color: 'blue',
  },
]

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    icon: 'text-blue-600',
    glow: 'group-hover:shadow-blue-500/10',
  },
  yellow: {
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    icon: 'text-amber-600',
    glow: 'group-hover:shadow-amber-500/10',
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-100',
    icon: 'text-red-600',
    glow: 'group-hover:shadow-red-500/10',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    icon: 'text-purple-600',
    glow: 'group-hover:shadow-purple-500/10',
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-100',
    icon: 'text-green-600',
    glow: 'group-hover:shadow-green-500/10',
  },
}

const Features = () => {
  return (
    <section id="features" className="py-32 px-4 relative">
      {/* Background - Removed static grid to show global animation */}
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary font-semibold text-sm mb-4">Features</span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight font-display text-ink-primary">
            Comprehensive Analysis
          </h2>
          <p className="text-xl text-ink-secondary max-w-2xl mx-auto">
            Our AI engine checks every product against thousands of safety parameters in real-time.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${colorClasses[feature.color].bg} ${colorClasses[feature.color].border}`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-white shadow-sm ${colorClasses[feature.color].icon}`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-ink-primary font-display">{feature.title}</h3>
              <p className="text-ink-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
