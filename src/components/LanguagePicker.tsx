import { useLingui } from '@lingui/react/macro'
import userStore, { Languages } from 'atoms/userStore'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

const availableLanguage = ['ru', 'en'] as const

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

  return (
    <button
      onClick={() => toggleLanguage(nextLang())}
      className="btn rounded-full font-medium text-sm"
      aria-label={`Switch language to ${nextLang()}`}
    >
      {user.language.toUpperCase()}
    </button>
  )
}
