import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Github, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import SectionModel from '@/components/3d/SectionModel'

export default function ContactSection() {
  const { toast } = useToast()
  const { t } = useTranslation()
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast({
      title: t('contact.success'),
      description: "I'll get back to you as soon as possible.",
    })
  }
  
  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-accent font-medium mb-2">{t('contact.title')}</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            {t('contact.description')}
          </h3>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="h-64 lg:h-72 mb-8">
              <SectionModel type="contact" className="h-full" />
            </div>
            
            <div className="space-y-6">
              {[
                { icon: <Mail className="w-5 h-5 text-accent" />, label: t('contact.emailLabel'), value: 'pratik.raj@example.com' },
                { icon: <Phone className="w-5 h-5 text-accent" />, label: 'Phone', value: '+1 (555) 123-4567' },
                { icon: <MapPin className="w-5 h-5 text-accent" />, label: 'Location', value: 'San Francisco, CA' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="p-3 glassmorphism rounded-full">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10">
              <h4 className="text-xl font-bold mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {[
                  { icon: <Github className="w-5 h-5" />, href: '#', label: 'Github' },
                  { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
                  { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
                  { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="p-3 glassmorphism rounded-full hover:neon-border transition-all"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="glassmorphism border-accent/20">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6">Let's Talk About Your Project</h3>
                <p className="text-muted-foreground mb-8">
                  Whether you have a question about a project, want to start a new collaboration, or just want to say hello, 
                  I'll try my best to get back to you as soon as possible.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        {t('contact.nameLabel')}
                      </label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        required
                        className="bg-background/50 border-input/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        {t('contact.emailLabel')}
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="bg-background/50 border-input/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="How can I help you?"
                      required
                      className="bg-background/50 border-input/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      {t('contact.messageLabel')}
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      rows={6}
                      required
                      className="bg-background/50 border-input/50"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    {t('contact.submitButton')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}