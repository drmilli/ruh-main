// Components
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import TokenSection from './components/TokenSection'
import Stats from './components/Stats'
import Footer from './components/Footer'
import AnimatedBackground from './components/AnimatedBackground'
import { WalletProvider } from './context/WalletContext'

function App() {
  return (
    <WalletProvider>
      <div className="relative min-h-screen bg-brand-background text-ink-primary">
        {/* Animated Background */}
        <AnimatedBackground />

        {/* Main Content */}
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <Features />
            <HowItWorks />
            <Stats />
            <TokenSection />
          </main>
          <Footer />
        </div>
      </div>
    </WalletProvider>
  )
}

export default App
