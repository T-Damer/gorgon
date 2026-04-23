import { useLingui } from '@lingui/react/macro'
import userStore, { Languages } from 'atoms/userStore'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

const availableLanguage = ['ru', 'en'] as const
const languageFlags: Record<(typeof availableLanguage)[number], string> = {
  ru: '🇷🇺',
  en: '🇬🇧',
}

export default function LanguagePicker() {
  const { i18n: t } = useLingui()
  const [user, setUser] = useAtom(userStore)

  useEffect(() => {
    setUser({ language: t.locale as Languages })
  }, [t.locale])

  const toggleLanguage = (newLang: Languages) => {
    t.activate(newLang)
    setUser({ language: newLang })
  }

  const nextLang = () => {
    const currentIndex = availableLanguage.indexOf(user.language)
    const nextIndex = (currentIndex + 1) % availableLanguage.length
    return availableLanguage[nextIndex]
  }

  const currentFlag = languageFlags[user.language]

  return (
    <button
      type="button"
      onClick={() => toggleLanguage(nextLang())}
      className="relative z-20 size-11 min-h-11 min-w-11 shrink-0 text-xl drop-shadow-sm"
      aria-label={`Switch language to ${nextLang()}`}
    >
      <span aria-hidden="true">{currentFlag}</span>
    </button>
  )
}
