import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Clock, Coffee, Users } from 'lucide-react'

const stats = [
  { 
    icon: <Calendar className="w-6 h-6 text-secondary" />,
    value: '5+',
    label: 'Years of Experience'
  },
  { 
    icon: <Coffee className="w-6 h-6 text-secondary" />,
    value: '100+',
    label: 'Projects Completed'
  },
  { 
    icon: <Users className="w-6 h-6 text-secondary" />,
    value: '50+',
    label: 'Satisfied Clients'
  },
  { 
    icon: <Clock className="w-6 h-6 text-secondary" />,
    value: '24/7',
    label: 'Support Available'
  }
]

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
}

export default function AboutSection() {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-accent font-medium mb-2">About Me</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Know More <span className="text-primary">About Me</span>
          </h3>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="w-full h-[400px] overflow-hidden rounded-2xl relative">
                <img
                  src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=800&fit=crop"
                  alt="Pratik Raj"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Experience badge */}
              <div className="glassmorphism absolute -bottom-5 -right-5 py-3 px-6 rounded-xl border border-accent/20 neon-border">
                <p className="text-2xl font-bold">5+ Years</p>
                <p className="text-muted-foreground text-sm">of Experience</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">Full Stack Developer & UI/UX Designer</h3>
            <p className="text-muted-foreground mb-6">
              I am a passionate software developer with expertise in creating exceptional digital 
              experiences using the latest technologies. With over 5 years of experience in the industry,
              I've developed a keen eye for detail and a love for writing clean, efficient code.
            </p>
            <p className="text-muted-foreground mb-6">
              My approach combines technical excellence with creative problem-solving to deliver
              solutions that are not only functional but also intuitive and visually stunning.
              I'm constantly exploring new technologies and methodologies to enhance my skills
              and provide the best possible outcomes for my clients.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span>Web Development</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span>Mobile Apps</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span>UI/UX Design</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span>DevOps</span>
              </div>
            </div>
            
            <Button>Download Resume</Button>
          </motion.div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
            >
              <Card className="glassmorphism border-accent/20 hover:neon-border transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">{stat.icon}</div>
                  <h4 className="text-3xl font-bold mb-1">{stat.value}</h4>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}