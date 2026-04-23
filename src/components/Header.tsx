import Logo from 'assets/Logo'
import LanguagePicker from './LanguagePicker'

export default function Header() {
  return (
    <div className="sticky top-0 z-20 w-full px-4 py-2">
      <div className="mx-auto flex h-12 w-full max-w-prose items-center justify-between">
        <Logo />
        <LanguagePicker />
      </div>
    </div>
  )
}
