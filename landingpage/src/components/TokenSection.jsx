import { useState } from 'react'
import { motion } from 'framer-motion'
import { useWallet } from '../context/WalletContext'
import WalletButton from './WalletButton'
import {
  Coins,
  TrendingUp,
  Users,
  Lock,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react'

const tokenomics = [
  { label: 'Total Supply', value: '1B', icon: Coins },
  { label: 'Community', value: '40%', icon: Users },
  { label: 'Development', value: '25%', icon: TrendingUp },
  { label: 'Liquidity', value: '20%', icon: Lock },
  { label: 'Marketing', value: '10%', icon: Sparkles },
  { label: 'Team', value: '5%', icon: Lock },
]

const TokenSection = () => {
  const { connected } = useWallet()
  const [copied, setCopied] = useState(false)
  const [amount, setAmount] = useState('')

  const tokenAddress = 'RUHxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

  const copyAddress = () => {
    navigator.clipboard.writeText(tokenAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const calculateTokens = (sol) => {
    const num = parseFloat(sol)
    if (isNaN(num) || num <= 0) return '0'
    return (num * 10000).toLocaleString()
  }

  return (
    <section id="token" className="py-32 px-4 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary font-semibold text-sm mb-4">Community Rewards</span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight font-display text-ink-primary">
            Power the <span className="text-brand-primary">Safety Network</span>
          </h2>
          <p className="text-ink-secondary text-lg max-w-2xl mx-auto">
            $RUH token enables decentralized product safety verification,
            governance voting, and rewards for contributors.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Token Info & Buy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-xl shadow-gray-200/50">
                {/* Token Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                    <img src="/icon.png" alt="Ruh" className="w-8 h-8 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-ink-primary">$RUH</h3>
                    <p className="text-ink-secondary text-sm">Solana SPL Token</p>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-200">Devnet</span>
                  </div>
                </div>

                {/* Token Address */}
                <div className="mb-8">
                  <label className="text-ink-secondary text-sm mb-2 block font-medium">Contract Address</label>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 border border-gray-200">
                    <code className="text-brand-primary text-sm flex-1 truncate font-mono">
                      {tokenAddress}
                    </code>
                    <button
                      onClick={copyAddress}
                      className="p-2 hover:bg-white rounded-lg transition-colors text-ink-secondary hover:text-brand-primary shadow-sm"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Buy Section */}
                <div className="space-y-4">
                  <div>
                    <label className="text-ink-secondary text-sm mb-2 block font-medium">Amount (SOL)</label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="0.0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-ink-primary placeholder-gray-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-ink-secondary">SOL</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm px-1">
                    <span className="text-ink-secondary">You receive:</span>
                    <span className="text-ink-primary font-bold">{calculateTokens(amount)} $RUH</span>
                  </div>

                  <button className="w-full py-4 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2">
                    {connected ? 'Swap SOL for RUH' : 'Connect Wallet to Buy'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Tokenomics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-ink-primary mb-6">Tokenomics</h3>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {tokenomics.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card rounded-xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-ink-primary font-semibold">{item.value}</p>
                      <p className="text-ink-secondary text-sm">{item.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Utility Section */}
            <div className="glass-card rounded-xl p-6">
              <h4 className="text-lg font-semibold text-ink-primary mb-4">Token Utility</h4>
              <ul className="space-y-3">
                {[
                  'Access premium safety analysis features',
                  'Vote on product safety standards',
                  'Earn rewards for submitting product data',
                  'Stake for network security benefits',
                  'Governance participation rights',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-indigo-600" />
                    </div>
                    <span className="text-ink-secondary text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <p className="text-ink-muted text-xs mt-4">
              * $RUH is currently on Solana Devnet for testing. Mainnet launch coming soon.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TokenSection
