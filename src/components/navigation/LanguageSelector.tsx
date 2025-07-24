import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Check, ChevronDown, Globe } from 'lucide-react'

// Define available languages with their metadata
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
]

export function LanguageSelector() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  
  // Get current language
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]
  
  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="language-selector">
          <Globe className="h-4 w-4 mr-1" />
          <span>{currentLanguage.flag}</span>
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2">
        <div className="flex flex-col space-y-1">
          {languages.map(language => (
            <button
              key={language.code}
              className="language-option"
              onClick={() => changeLanguage(language.code)}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="flex-grow text-left">{language.name}</span>
              {currentLanguage.code === language.code && (
                <Check className="h-4 w-4" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}