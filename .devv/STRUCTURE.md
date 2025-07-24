# This file is only for editing file nodes, do not break the structure

/src
├── assets/          # Static resources directory, storing static files like images and fonts
│
├── components/      # Components directory
│   ├── 3d/         # 3D Components for Three.js rendering
│   │   ├── Avatar.tsx      # Enhanced 3D avatar component with animations, theme-aware lighting, and cursor interaction
│   │   ├── FloatingParticles.tsx # Optimized floating code snippet particles component with theme awareness
│   │   ├── Scene.tsx       # Main 3D scene component with theme-responsive lighting and performance optimizations
│   │   └── SectionModel.tsx # Section-specific 3D models (laptop, skills cube, resume, contact)
│   ├── navigation/  # Navigation components
│   │   ├── Footer.tsx      # Footer component with internationalization
│   │   ├── LanguageSelector.tsx # Language selector component with country flags
│   │   ├── Navbar.tsx      # Main navigation bar component with theme toggle and language selector
│   │   └── ThemeToggle.tsx # Theme toggle component for switching between dark and light modes
│   ├── sections/    # Main page section components
│   │   ├── AboutSection.tsx     # About me section
│   │   ├── ContactSection.tsx   # Contact form and information with 3D contact model
│   │   ├── HeroSection.tsx      # Main hero section with 3D elements
│   │   ├── ProjectsSection.tsx  # Portfolio projects showcase with 3D laptop model
│   │   ├── ResumeSection.tsx    # Resume/experience section with floating 3D resume
│   │   └── SkillsSection.tsx    # Skills and expertise section with rotating 3D skills cube
│   └── ui/         # Pre-installed shadcn/ui components, avoid modifying or rewriting unless necessary
│
├── hooks/          # Custom Hooks directory
│   ├── use-mobile.ts # Pre-installed mobile detection Hook from shadcn (import { useIsMobile } from '@/hooks/use-mobile')
│   └── use-toast.ts  # Toast notification system hook for displaying toast messages (import { useToast } from '@/hooks/use-toast')
│
├── lib/            # Utility library directory
│   ├── i18n.ts     # Internationalization configuration with English, Hindi, and Spanish translations
│   ├── theme-context.tsx # Theme context provider for light/dark mode toggle
│   └── utils.ts    # Utility functions, including the cn function for merging Tailwind class names
│
├── pages/          # Page components directory, based on React Router structure
│   ├── HomePage.tsx # Home page component, serving as the main entry point of the application
│   └── NotFoundPage.tsx # 404 error page component, displays when users access non-existent routes
│
├── App.tsx         # Root component, with React Router routing system configured
│                   # Wraps app with ThemeProvider and initializes i18n
│                   # Add new route configurations in this file
│                   # Includes catch-all route (*) for 404 page handling
│
├── main.tsx        # Entry file, rendering the root component and mounting to the DOM
│
├── index.css       # Global styles file, containing Tailwind configuration and custom styles
│                   # Includes light and dark theme variables
│
└── tailwind.config.js  # Tailwind CSS v3 configuration file
                      # Contains theme customization, plugins, and content paths
                      # Includes shadcn/ui theme configuration 