import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSelector } from './LanguageSelector'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: t('navigation.home'), href: '#home' },
    { label: t('navigation.about'), href: '#about' },
    { label: t('navigation.skills'), href: '#skills' },
    { label: t('navigation.projects'), href: '#projects' },
    { label: t('navigation.resume'), href: '#resume' },
    { label: t('navigation.contact'), href: '#contact' },
  ]
  
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'glassmorphism py-3' : 'py-5'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <span className="text-xl font-bold text-accent">
            &lt;Pratik <span className="text-primary">Raj /&gt;</span>
          </span>
        </a>
        
        {isMobile ? (
          <>
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X /> : <Menu />}
              </Button>
            </div>
            
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="absolute top-full left-0 w-full glassmorphism py-5 mt-1"
              >
                <ul className="flex flex-col items-center space-y-4">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-foreground hover:text-accent transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <Button onClick={() => setIsOpen(false)}>
                      {t('hero.contactButton')}
                    </Button>
                  </li>
                </ul>
              </motion.div>
            )}
          </>
        ) : (
          <div className="flex items-center gap-5">
            <nav>
              <ul className="flex items-center gap-8">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-muted-foreground hover:text-accent transition-colors relative group"
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center gap-3">
              <LanguageSelector />
              <ThemeToggle />
              <Button>{t('hero.contactButton')}</Button>
            </div>
          </div>
        )}
      </div>
    </motion.header>
  )
}