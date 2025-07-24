import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ExternalLink, Github } from 'lucide-react'
import SectionModel from '@/components/3d/SectionModel'
import { useIsMobile } from '@/hooks/use-mobile'

const projects = [
  {
    id: 1,
    title: 'E-commerce Dashboard',
    description: 'A comprehensive dashboard with analytics, inventory management, and sales tracking.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    category: 'Web',
    demoLink: '#',
    githubLink: '#',
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB']
  },
  {
    id: 2,
    title: 'Travel Companion App',
    description: 'A mobile app for travelers to plan trips, find attractions, and share experiences.',
    image: 'https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=600&h=400&fit=crop',
    category: 'Mobile',
    demoLink: '#',
    githubLink: '#',
    technologies: ['React Native', 'Firebase', 'Google Maps API']
  },
  {
    id: 3,
    title: 'Banking UI Kit',
    description: 'A comprehensive UI kit for financial applications with dark and light themes.',
    image: 'https://images.unsplash.com/photo-1616514197671-15d99ce7a6f8?w=600&h=400&fit=crop',
    category: 'UI/UX',
    demoLink: '#',
    githubLink: '#',
    technologies: ['Figma', 'Adobe XD', 'Illustrator']
  },
  {
    id: 4,
    title: '3D Product Configurator',
    description: 'Interactive 3D product customization tool for e-commerce websites.',
    image: 'https://images.unsplash.com/photo-1618609377864-68609b857e90?w=600&h=400&fit=crop',
    category: '3D',
    demoLink: '#',
    githubLink: '#',
    technologies: ['Three.js', 'React', 'WebGL']
  },
  {
    id: 5,
    title: 'Social Media Platform',
    description: 'A modern social network with real-time chat, media sharing, and robust user profiles.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=400&fit=crop',
    category: 'Web',
    demoLink: '#',
    githubLink: '#',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB']
  },
  {
    id: 6,
    title: 'Fitness Tracking App',
    description: 'Mobile application for tracking workouts, nutrition, and personal fitness goals.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop',
    category: 'Mobile',
    demoLink: '#',
    githubLink: '#',
    technologies: ['Flutter', 'Firebase', 'HealthKit']
  },
]

export default function ProjectsSection() {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [activeCategory, setActiveCategory] = useState('All')
  
  const categories = [
    { value: 'All', label: t('projects.categories.all') },
    { value: 'Web', label: t('projects.categories.web') },
    { value: 'Mobile', label: t('projects.categories.mobile') },
    { value: 'UI/UX', label: t('projects.categories.design') },
    { value: '3D', label: '3D' },
  ]
  
  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory)
    
  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Model is shown on left for desktop view */}
          {!isMobile && (
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/3 hidden lg:block"
            >
              <SectionModel 
                type="laptop" 
                className="h-[400px]" 
              />
            </motion.div>
          )}
          
          <div className="w-full lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left mb-16"
            >
              <h2 className="text-accent font-medium mb-2">{t('projects.title')}</h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                {t('projects.description')}
              </h3>
              <div className="w-20 h-1.5 bg-primary mx-auto lg:mx-0 rounded-full" />
            </motion.div>
            
            {/* Model is shown here on mobile view */}
            {isMobile && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="w-full h-[250px] mb-8"
              >
                <SectionModel 
                  type="laptop" 
                  className="h-full" 
                />
              </motion.div>
            )}
            
            <Tabs defaultValue="All" className="w-full">
              <TabsList className="flex justify-center lg:justify-start mb-8 bg-transparent">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.value}
                    value={category.value}
                    onClick={() => setActiveCategory(category.value)}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={activeCategory} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden glassmorphism border-accent/20 hover:neon-border transition-all h-full">
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                        <CardContent className="p-6">
                          <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                          <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.technologies.map((tech) => (
                              <span key={tech} className="text-xs bg-muted px-2 py-1 rounded-full">
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex gap-4">
                            <Button asChild variant="outline" size="sm" className="gap-2">
                              <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                <Github size={16} />
                                Code
                              </a>
                            </Button>
                            <Button asChild size="sm" className="gap-2">
                              <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                                <ExternalLink size={16} />
                                {t('projects.viewProject')}
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-center lg:justify-start mt-12">
              <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                {t('projects.viewAll')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}