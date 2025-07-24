import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Progress } from '@/components/ui/progress'
import SectionModel from '@/components/3d/SectionModel'
import { useIsMobile } from '@/hooks/use-mobile'

// Skills data
const skillCategories = [
  {
    id: 'frontend',
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'CSS/SASS', level: 90 },
      { name: 'Framer Motion', level: 80 },
      { name: 'Three.js', level: 75 }
    ]
  },
  {
    id: 'backend',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express', level: 80 },
      { name: 'Python', level: 75 },
      { name: 'Django', level: 70 },
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 80 }
    ]
  },
  {
    id: 'tools',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'AWS', level: 80 },
      { name: 'CI/CD', level: 85 },
      { name: 'Figma', level: 70 },
      { name: 'Webpack', level: 75 }
    ]
  }
]

export default function SkillsSection() {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [activeCategory, setActiveCategory] = useState('frontend')
  
  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-accent font-medium mb-2">{t('skills.title')}</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            {t('skills.description')}
          </h3>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </motion.div>
        
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="w-full lg:w-2/3">
            <div className="mb-8 flex justify-center lg:justify-start gap-4">
              {skillCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    activeCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {t(`skills.${category.id}`)}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {skillCategories
                .find(category => category.id === activeCategory)
                ?.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-2 bg-muted"
                      indicatorClassName={`${
                        activeCategory === 'frontend'
                          ? 'bg-primary'
                          : activeCategory === 'backend'
                          ? 'bg-secondary'
                          : 'bg-accent'
                      }`}
                    />
                  </motion.div>
                ))}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/3 h-[300px] lg:h-[400px]"
          >
            <SectionModel 
              type="skills" 
              className="h-full" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}