import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight } from 'lucide-react'

const WalletContext = createContext(null)

export function WalletProvider({ children }) {
  const [connected, setConnected] = useState(false)
  const [publicKey, setPublicKey] = useState(null)
  const [walletName, setWalletName] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const getPhantom = () => {
    if (typeof window !== 'undefined') {
      if (window.phantom?.solana?.isPhantom) {
        return window.phantom.solana
      }
      if (window.solana?.isPhantom) {
        return window.solana
      }
    }
    return null
  }

  const getSolflare = () => {
    if (typeof window !== 'undefined' && window.solflare?.isSolflare) {
      return window.solflare
    }
    return null
  }

  const connectPhantom = useCallback(async () => {
    console.log('Attempting to connect to Phantom...')
    const phantom = getPhantom()
    console.log('Phantom object found:', !!phantom)
    
    if (phantom) {
      try {
        const response = await phantom.connect()
        console.log('Phantom connected:', response.publicKey.toString())
        setPublicKey(response.publicKey.toString())
        setConnected(true)
        setWalletName('Phantom')
        setShowModal(false)
      } catch (err) {
        console.error('Phantom connection error:', err)
      }
    } else {
      console.log('Phantom not found, opening install page')
      window.open('https://phantom.app/', '_blank')
    }
  }, [])

  const connectSolflare = useCallback(async () => {
    const solflare = getSolflare()
    if (solflare) {
      try {
        await solflare.connect()
        setPublicKey(solflare.publicKey.toString())
        setConnected(true)
        setWalletName('Solflare')
        setShowModal(false)
      } catch (err) {
        console.error('Solflare connection error:', err)
      }
    } else {
      window.open('https://solflare.com/', '_blank')
    }
  }, [])

  const disconnect = useCallback(async () => {
    const phantom = getPhantom()
    const solflare = getSolflare()

    if (walletName === 'Phantom' && phantom) {
      await phantom.disconnect()
    } else if (walletName === 'Solflare' && solflare) {
      await solflare.disconnect()
    }

    setConnected(false)
    setPublicKey(null)
    setWalletName(null)
  }, [walletName])

  useEffect(() => {
    const phantom = getPhantom()
    if (phantom) {
      phantom.on('disconnect', () => {
        setConnected(false)
        setPublicKey(null)
        setWalletName(null)
      })
    }
  }, [])

  const formatPublicKey = (key) => {
    if (!key) return ''
    return `${key.slice(0, 4)}...${key.slice(-4)}`
  }

  return (
    <WalletContext.Provider
      value={{
        connected,
        publicKey,
        walletName,
        showModal,
        setShowModal,
        connectPhantom,
        connectSolflare,
        disconnect,
        formatPublicKey,
      }}
    >
      {children}

      {/* Global Wallet Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            key="wallet-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              key="wallet-modal-content"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card rounded-2xl p-6 w-full max-w-md bg-white border border-gray-100 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Connect Wallet</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Wallet Options */}
              <div className="space-y-3">
                {/* Phantom */}
                <motion.button
                  type="button"
                  onClick={connectPhantom}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-brand-primary/30 transition-all group cursor-pointer"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#AB9FF2] flex items-center justify-center shadow-sm">
                    <svg width="24" height="24" viewBox="0 0 128 128" fill="none">
                      <circle cx="64" cy="64" r="64" fill="#AB9FF2"/>
                      <path d="M110.584 64.9142H99.142C99.142 41.7651 80.173 23 56.7724 23C33.6612 23 14.8716 41.3057 14.4118 64.0583C13.936 87.5183 35.8588 107.5 59.8427 107.5H63.9315C84.5862 107.5 110.584 89.1593 110.584 64.9142Z" fill="url(#paint0_linear)"/>
                      <path d="M77.5879 66.2606C77.5879 70.0072 74.6406 73.0412 70.9993 73.0412C67.358 73.0412 64.4108 70.0072 64.4108 66.2606C64.4108 62.514 67.358 59.48 70.9993 59.48C74.6406 59.48 77.5879 62.514 77.5879 66.2606Z" fill="white"/>
                      <path d="M50.4058 66.2606C50.4058 70.0072 47.4586 73.0412 43.8173 73.0412C40.176 73.0412 37.2288 70.0072 37.2288 66.2606C37.2288 62.514 40.176 59.48 43.8173 59.48C47.4586 59.48 50.4058 62.514 50.4058 66.2606Z" fill="white"/>
                      <defs>
                        <linearGradient id="paint0_linear" x1="62.4981" y1="107.5" x2="62.4981" y2="23" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#534BB1"/>
                          <stop offset="1" stopColor="#551BF9"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-900 font-bold group-hover:text-brand-primary transition-colors">Phantom</p>
                    <p className="text-gray-500 text-sm font-medium">Popular Solana wallet</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-brand-primary transition-colors" />
                </motion.button>

                {/* Solflare */}
                <motion.button
                  type="button"
                  onClick={connectSolflare}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-brand-primary/30 transition-all group cursor-pointer"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center shadow-sm">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                      <path d="M2 17L12 22L22 17"/>
                      <path d="M2 12L12 17L22 12"/>
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-900 font-bold group-hover:text-brand-primary transition-colors">Solflare</p>
                    <p className="text-gray-500 text-sm font-medium">Secure Solana wallet</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-brand-primary transition-colors" />
                </motion.button>
              </div>

              {/* Footer */}
              <p className="text-center text-gray-500 text-sm mt-6">
                New to Solana?{' '}
                <a
                  href="https://phantom.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Get a wallet
                </a>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}
