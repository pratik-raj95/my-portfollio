import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// English translations
const enTranslations = {
  navigation: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    resume: 'Resume',
    contact: 'Contact',
  },
  hero: {
    greeting: 'Hi, I\'m',
    role: 'Software Developer',
    description: 'I build modern web applications with cutting-edge technologies.',
    ctaButton: 'View My Work',
    contactButton: 'Get In Touch',
  },
  about: {
    title: 'About Me',
    description: 'I am a passionate software developer with expertise in building performant and visually appealing web applications. I love working with modern frameworks and exploring new technologies.',
    yearsExperience: 'Years Experience',
    projectsCompleted: 'Projects Completed',
    happyClients: 'Happy Clients',
    awards: 'Awards',
  },
  skills: {
    title: 'My Skills',
    description: 'I specialize in frontend and full-stack development with a focus on modern JavaScript frameworks.',
    frontend: 'Frontend',
    backend: 'Backend',
    tools: 'Tools',
  },
  projects: {
    title: 'My Projects',
    description: 'Check out some of my recent work.',
    viewAll: 'View All',
    viewProject: 'View Project',
    categories: {
      all: 'All',
      web: 'Web Development',
      mobile: 'Mobile Apps',
      design: 'UI/UX Design',
    },
  },
  resume: {
    title: 'My Resume',
    description: 'My professional journey and qualifications.',
    download: 'Download CV',
    experience: 'Experience',
    education: 'Education',
    certifications: 'Certifications',
  },
  contact: {
    title: 'Contact Me',
    description: 'Get in touch with me for collaborations or opportunities.',
    nameLabel: 'Your Name',
    emailLabel: 'Your Email',
    messageLabel: 'Your Message',
    submitButton: 'Send Message',
    success: 'Thank you! Your message has been sent.',
    error: 'Oops! Something went wrong. Please try again.',
  },
  footer: {
    copyright: '© 2025 Pratik Raj. All rights reserved.',
    madeWith: 'Made with ❤️ using React & Three.js',
  },
  theme: {
    light: 'Light Mode',
    dark: 'Dark Mode',
  },
}

// Hindi translations
const hiTranslations = {
  navigation: {
    home: 'होम',
    about: 'परिचय',
    skills: 'कौशल',
    projects: 'प्रोजेक्ट्स',
    resume: 'रिज्यूमे',
    contact: 'संपर्क',
  },
  hero: {
    greeting: 'नमस्ते, मैं हूँ',
    role: 'सॉफ्टवेयर डेवलपर',
    description: 'मैं आधुनिक वेब एप्लिकेशन बनाता हूँ उन्नत तकनीकों के साथ।',
    ctaButton: 'मेरा काम देखें',
    contactButton: 'संपर्क करें',
  },
  about: {
    title: 'मेरे बारे में',
    description: 'मैं एक उत्साही सॉफ्टवेयर डेवलपर हूँ जिसे उच्च प्रदर्शन वाले और आकर्षक वेब एप्लिकेशन बनाने में विशेषज्ञता है। मुझे आधुनिक फ्रेमवर्क्स के साथ काम करना और नई तकनीकों का अन्वेषण करना पसंद है।',
    yearsExperience: 'वर्षों का अनुभव',
    projectsCompleted: 'पूरे किए गए प्रोजेक्ट्स',
    happyClients: 'संतुष्ट ग्राहक',
    awards: 'पुरस्कार',
  },
  skills: {
    title: 'मेरे कौशल',
    description: 'मैं आधुनिक जावास्क्रिप्ट फ्रेमवर्क्स पर ध्यान केंद्रित करके फ्रंटएंड और फुल-स्टैक डेवलपमेंट में विशेषज्ञ हूं।',
    frontend: 'फ्रंटएंड',
    backend: 'बैकएंड',
    tools: 'उपकरण',
  },
  projects: {
    title: 'मेरे प्रोजेक्ट्स',
    description: 'मेरे कुछ हालिया कार्य देखें।',
    viewAll: 'सभी देखें',
    viewProject: 'प्रोजेक्ट देखें',
    categories: {
      all: 'सभी',
      web: 'वेब डेवलपमेंट',
      mobile: 'मोबाइल ऐप्स',
      design: 'यूआई/यूएक्स डिज़ाइन',
    },
  },
  resume: {
    title: 'मेरा रिज्यूमे',
    description: 'मेरी पेशेवर यात्रा और योग्यताएँ।',
    download: 'सीवी डाउनलोड करें',
    experience: 'अनुभव',
    education: 'शिक्षा',
    certifications: 'प्रमाणपत्र',
  },
  contact: {
    title: 'मुझसे संपर्क करें',
    description: 'सहयोग या अवसरों के लिए मुझसे संपर्क करें।',
    nameLabel: 'आपका नाम',
    emailLabel: 'आपका ईमेल',
    messageLabel: 'आपका संदेश',
    submitButton: 'संदेश भेजें',
    success: 'धन्यवाद! आपका संदेश भेज दिया गया है।',
    error: 'ओह! कुछ गलत हो गया। कृपया पुनः प्रयास करें।',
  },
  footer: {
    copyright: '© 2025 प्रतीक राज। सर्वाधिकार सुरक्षित।',
    madeWith: 'React और Three.js का उपयोग करके ❤️ के साथ बनाया गया',
  },
  theme: {
    light: 'लाइट मोड',
    dark: 'डार्क मोड',
  },
}

// Spanish translations
const esTranslations = {
  navigation: {
    home: 'Inicio',
    about: 'Sobre Mí',
    skills: 'Habilidades',
    projects: 'Proyectos',
    resume: 'Currículum',
    contact: 'Contacto',
  },
  hero: {
    greeting: 'Hola, soy',
    role: 'Desarrollador de Software',
    description: 'Construyo aplicaciones web modernas con tecnologías de vanguardia.',
    ctaButton: 'Ver Mi Trabajo',
    contactButton: 'Contactarme',
  },
  about: {
    title: 'Sobre Mí',
    description: 'Soy un desarrollador de software apasionado con experiencia en construir aplicaciones web eficientes y visualmente atractivas. Me encanta trabajar con frameworks modernos y explorar nuevas tecnologías.',
    yearsExperience: 'Años de Experiencia',
    projectsCompleted: 'Proyectos Completados',
    happyClients: 'Clientes Satisfechos',
    awards: 'Premios',
  },
  skills: {
    title: 'Mis Habilidades',
    description: 'Me especializo en desarrollo frontend y full-stack con enfoque en frameworks modernos de JavaScript.',
    frontend: 'Frontend',
    backend: 'Backend',
    tools: 'Herramientas',
  },
  projects: {
    title: 'Mis Proyectos',
    description: 'Mira algunos de mis trabajos recientes.',
    viewAll: 'Ver Todos',
    viewProject: 'Ver Proyecto',
    categories: {
      all: 'Todos',
      web: 'Desarrollo Web',
      mobile: 'Apps Móviles',
      design: 'Diseño UI/UX',
    },
  },
  resume: {
    title: 'Mi Currículum',
    description: 'Mi trayectoria profesional y cualificaciones.',
    download: 'Descargar CV',
    experience: 'Experiencia',
    education: 'Educación',
    certifications: 'Certificaciones',
  },
  contact: {
    title: 'Contáctame',
    description: 'Ponte en contacto conmigo para colaboraciones u oportunidades.',
    nameLabel: 'Tu Nombre',
    emailLabel: 'Tu Email',
    messageLabel: 'Tu Mensaje',
    submitButton: 'Enviar Mensaje',
    success: '¡Gracias! Tu mensaje ha sido enviado.',
    error: '¡Ups! Algo salió mal. Por favor, intenta de nuevo.',
  },
  footer: {
    copyright: '© 2025 Pratik Raj. Todos los derechos reservados.',
    madeWith: 'Hecho con ❤️ usando React y Three.js',
  },
  theme: {
    light: 'Modo Claro',
    dark: 'Modo Oscuro',
  },
}

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      hi: { translation: hiTranslations },
      es: { translation: esTranslations }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  })

export default i18n