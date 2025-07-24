import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const { clientX, clientY } = e
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      
      const x = (clientX - left) / width - 0.5
      const y = (clientY - top) / height - 0.5
      
      containerRef.current.style.setProperty('--mouse-x', `${x * 20}px`)
      containerRef.current.style.setProperty('--mouse-y', `${y * 20}px`)
    }
    
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])
  
  return (
    <section
      id="home"
      className="min-h-screen pt-24 relative hero-gradient overflow-hidden"
      ref={containerRef}
    >
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=1800&h=1200&fit=crop')] opacity-10 bg-cover bg-center"
        style={{
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)'
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-6rem)]">
        <div className="text-center max-w-3xl mx-auto" style={{ 
          transform: 'translateX(var(--mouse-x, 0)) translateY(var(--mouse-y, 0))' 
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-lg md:text-xl mb-2 text-accent">Hello, I'm</h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 neon-text">
              Pratik Raj
            </h1>
            <div className="glassmorphism inline-block px-6 py-2 mb-6">
              <h3 className="text-xl md:text-2xl font-medium text-secondary">
                Software Developer
              </h3>
            </div>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-8">
              I build exceptional digital experiences with clean code and innovative solutions.
              Specializing in modern web technologies to create stunning, high-performance applications.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/80">
                View Portfolio
              </Button>
              <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                Download CV
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            <div className="flex justify-center gap-6">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glassmorphism rounded-full hover:neon-border transition-all"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glassmorphism rounded-full hover:neon-border transition-all"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glassmorphism rounded-full hover:neon-border transition-all"
              >
                <Twitter size={20} />
              </a>
            </div>
          </motion.div>
        </div>
        
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute bottom-8"
          >
            <a
              href="#about"
              className="flex flex-col items-center text-muted-foreground hover:text-accent transition-all"
            >
              <span className="mb-2 text-sm">Scroll Down</span>
              <ArrowDown size={20} className="animate-bounce" />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}