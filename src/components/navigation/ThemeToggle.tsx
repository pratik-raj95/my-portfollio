import { useTranslation } from 'react-i18next'
import { Switch } from '@/components/ui/switch'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/lib/theme-context'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4 text-muted-foreground" />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        className="theme-toggle"
        aria-label={t('theme.' + theme)}
      >
        <motion.span
          className="theme-toggle-thumb"
          animate={{ 
            translateX: theme === 'dark' ? 24 : 0,
            backgroundColor: theme === 'dark' ? '#5B21B6' : '#FFFFFF'
          }}
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
        />
      </Switch>
      <Moon className="h-4 w-4 text-muted-foreground" />
    </div>
  )
}