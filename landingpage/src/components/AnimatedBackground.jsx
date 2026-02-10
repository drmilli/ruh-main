import { useEffect, useRef } from 'react'

const AnimatedBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    
    // Configuration
    const particleCount = 60 // Number of nodes
    const connectionDistance = 150 // Max distance to connect
    const mouseDistance = 200 // Mouse interaction radius
    
    let particles = []
    let mouse = { x: undefined, y: undefined }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.3 // Very slow velocity
        this.vy = (Math.random() - 0.5) * 0.3
        this.size = Math.random() * 2 + 0.5
        // Brown/Warm shades (Subtle)
        this.color = Math.random() > 0.5 ? 'rgba(120, 85, 70, 0.15)' : 'rgba(160, 120, 100, 0.15)' 
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1

        // Mouse interaction (gentle repel)
        if (mouse.x) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < mouseDistance) {
            const forceDirectionX = dx / distance
            const forceDirectionY = dy / distance
            const force = (mouseDistance - distance) / mouseDistance
            const directionX = forceDirectionX * force * 0.2
            const directionY = forceDirectionY * force * 0.2
            this.vx -= directionX
            this.vy -= directionY
          }
        }
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    const initParticles = () => {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw Grid Background
      ctx.strokeStyle = 'rgba(120, 85, 70, 0.1)' // Brown tint, visible but subtle
      ctx.lineWidth = 1
      
      const gridSize = 50
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // Draw connections
      particles.forEach((a, index) => {
        for (let j = index + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(120, 85, 70, ${0.2 * (1 - distance / connectionDistance)})` // Warm Brown
            ctx.lineWidth = 1.5
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x
      mouse.y = e.y
    })

    resize()
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  )
}

export default AnimatedBackground
