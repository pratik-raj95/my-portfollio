import { Suspense, useEffect } from 'react'
import Navbar from '@/components/navigation/Navbar'
import Scene from '@/components/3d/Scene'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ResumeSection from '@/components/sections/ResumeSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/navigation/Footer'
import { useToast } from '@/hooks/use-toast'
import { useTranslation } from 'react-i18next'

function HomePage() {
  const { toast } = useToast()
  const { i18n } = useTranslation()
  
  useEffect(() => {
    // Show welcome toast on initial load in user's language
    setTimeout(() => {
      toast({
        title: i18n.language === 'hi' ? 
          "मेरे पोर्टफोलियो में आपका स्वागत है!" :
          i18n.language === 'es' ?
          "¡Bienvenido a mi portafolio!" :
          "Welcome to my portfolio!",
        description: i18n.language === 'hi' ? 
          "मेरे काम का पता लगाएं और अगर आपके कोई प्रश्न हैं तो संपर्क करें।" :
          i18n.language === 'es' ?
          "Explore mi trabajo y contáctame si tienes alguna pregunta." :
          "Feel free to explore my work and get in touch if you have any questions.",
      })
    }, 1500)
  }, [toast, i18n.language])
  
  // Scroll animation observer
  useEffect(() => {
    const animatedElements = document.querySelectorAll('.scroll-animated')
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    
    animatedElements.forEach(el => observer.observe(el))
    
    return () => {
      animatedElements.forEach(el => observer.unobserve(el))
    }
  }, [])
  
  return (
    <div className="relative">
      {/* 3D Scene Background */}
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      
      {/* Content */}
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage