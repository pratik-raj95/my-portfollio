import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Download } from 'lucide-react'
import SectionModel from '@/components/3d/SectionModel'
import { useIsMobile } from '@/hooks/use-mobile'

export default function ResumeSection() {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  
  return (
    <section id="resume" className="py-20 bg-muted/20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-accent font-medium mb-2">{t('resume.title')}</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            {t('resume.description')}
          </h3>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </motion.div>
        
        <div className="flex flex-col lg:flex-row items-start gap-10">
          {/* Resume 3D Model - visible in different positions based on screen size */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={`${isMobile ? 'w-full h-[250px] mb-8 order-1' : 'w-1/4 h-[400px] sticky top-28'}`}
          >
            <SectionModel 
              type="resume" 
              className="h-full" 
            />
          </motion.div>
          
          <div className={`${isMobile ? 'w-full' : 'w-3/4'}`}>
            <div className="flex justify-center mb-10">
              <Button className="gap-2">
                <Download size={18} />
                {t('resume.download')}
              </Button>
            </div>
            
            <Tabs defaultValue="experience" className="w-full">
              <TabsList className="flex justify-center mb-10 bg-transparent">
                <TabsTrigger 
                  value="experience" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {t('resume.experience')}
                </TabsTrigger>
                <TabsTrigger 
                  value="education"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {t('resume.education')}
                </TabsTrigger>
                <TabsTrigger 
                  value="certifications"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {t('resume.certifications')}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="experience">
                <div className="space-y-8">
                  {[
                    {
                      title: 'Senior Software Developer',
                      company: 'TechCorp Solutions',
                      period: '2022 - Present',
                      description: 'Led a team of 5 developers in creating enterprise-level web applications using React, Node.js, and MongoDB. Improved system performance by 40% through code optimization and architecture redesign.'
                    },
                    {
                      title: 'Full Stack Developer',
                      company: 'Digital Innovations',
                      period: '2020 - 2022',
                      description: 'Developed and maintained multiple client projects using React, Express, and PostgreSQL. Implemented CI/CD pipelines resulting in 60% faster deployment times and fewer production issues.'
                    },
                    {
                      title: 'Frontend Developer',
                      company: 'WebCreations Inc.',
                      period: '2018 - 2020',
                      description: 'Created responsive, cross-browser compatible websites using modern JavaScript frameworks. Collaborated with designers to implement pixel-perfect UI from design mockups.'
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="glassmorphism border-accent/20 p-6 relative before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary before:rounded-l-lg"
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">
                        <h4 className="text-xl font-bold">{item.title}</h4>
                        <div className="glassmorphism px-3 py-1 text-sm">{item.period}</div>
                      </div>
                      <h5 className="text-secondary text-lg mb-3">{item.company}</h5>
                      <p className="text-muted-foreground">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="education">
                <div className="space-y-8">
                  {[
                    {
                      degree: 'Master of Computer Science',
                      institution: 'Stanford University',
                      period: '2016 - 2018',
                      description: 'Specialized in Artificial Intelligence and Machine Learning. Completed thesis on "Neural Networks for Predictive Analytics in Healthcare".'
                    },
                    {
                      degree: 'Bachelor of Technology',
                      institution: 'MIT',
                      period: '2012 - 2016',
                      description: 'Computer Science major with minor in Data Science. Graduated with honors (3.9 GPA). Active member of the coding club and hackathon winner.'
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={item.degree}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="glassmorphism border-accent/20 p-6 relative before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-secondary before:rounded-l-lg"
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">
                        <h4 className="text-xl font-bold">{item.degree}</h4>
                        <div className="glassmorphism px-3 py-1 text-sm">{item.period}</div>
                      </div>
                      <h5 className="text-secondary text-lg mb-3">{item.institution}</h5>
                      <p className="text-muted-foreground">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="certifications">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      name: 'AWS Certified Solutions Architect',
                      provider: 'Amazon Web Services',
                      date: 'Jan 2023',
                      description: 'Advanced cloud architecture design principles and best practices'
                    },
                    {
                      name: 'Google Professional Cloud Developer',
                      provider: 'Google Cloud',
                      date: 'May 2022',
                      description: 'Building scalable and reliable applications on Google Cloud Platform'
                    },
                    {
                      name: 'React Advanced Developer',
                      provider: 'Meta',
                      date: 'Oct 2021',
                      description: 'Advanced React patterns, performance optimization, and state management'
                    },
                    {
                      name: 'TensorFlow Developer Certificate',
                      provider: 'Google',
                      date: 'Mar 2021',
                      description: 'Building and training neural networks for computer vision, NLP, and time series'
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="glassmorphism border-accent/20 p-6"
                    >
                      <h4 className="text-xl font-bold mb-2">{item.name}</h4>
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="text-secondary">{item.provider}</h5>
                        <div className="text-sm text-muted-foreground">{item.date}</div>
                      </div>
                      <p className="text-muted-foreground">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
}