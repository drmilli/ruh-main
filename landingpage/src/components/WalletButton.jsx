import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, ChevronDown, LogOut, Copy, Check } from 'lucide-react'
import { useWallet } from '../context/WalletContext'

const WalletButton = () => {
  const {
    connected,
    publicKey,
    walletName,
    setShowModal,
    disconnect,
    formatPublicKey,
  } = useWallet()

  const [showDropdown, setShowDropdown] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (connected) {
    return (
      <div className="relative z-50">
        <motion.button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 hover:border-brand-primary/50 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-ink-primary font-medium text-sm">{formatPublicKey(publicKey)}</span>
          <ChevronDown className={`w-4 h-4 text-ink-secondary transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
        </motion.button>

        {/* Dropdown */}
        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl p-2 z-50 shadow-xl shadow-gray-200/50 border border-gray-100"
            >
              <div className="flex items-center gap-3 p-3 mb-1">
                <div className="w-9 h-9 rounded-lg bg-brand-primary flex items-center justify-center text-white">
                  <Wallet className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-ink-primary font-medium text-sm">{walletName}</p>
                  <p className="text-green-600 text-xs font-medium">Connected</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-1">
                <button
                  onClick={copyAddress}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-ink-secondary" />
                  )}
                  <span className="text-ink-primary text-sm">
                    {copied ? 'Copied!' : 'Copy Address'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    disconnect()
                    setShowDropdown(false)
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span className="text-red-500 text-sm">Disconnect</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <motion.button
      type="button"
      onClick={() => {
        console.log('Opening wallet modal')
        setShowModal(true)
      }}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-sm transition-all shadow-sm cursor-pointer relative z-50"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Wallet className="w-4 h-4" />
      Connect Wallet
    </motion.button>
  )
}

export default WalletButton
