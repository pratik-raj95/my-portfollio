import { ArrowUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  return (
    <footer className="bg-muted/20 py-10 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="flex items-center gap-2">
              <span className="text-xl font-bold text-accent">
                &lt;Pratik <span className="text-primary">Raj /&gt;</span>
              </span>
            </a>
            <p className="text-muted-foreground mt-2 max-w-md">
              {t('footer.madeWith')}
            </p>
          </div>
          
          <div className="flex flex-col items-end">
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="p-3 glassmorphism rounded-full hover:neon-border transition-all mb-4"
            >
              <ArrowUp size={20} />
            </button>
            <p className="text-muted-foreground text-sm">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}