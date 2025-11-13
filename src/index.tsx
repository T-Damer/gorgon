import App from 'App'
import 'index.css'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { messages as en } from 'locales/en/messages'
import { messages as ru } from 'locales/ru/messages'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'

i18n.load({
  en,
  ru,
})
i18n.activate('ru')

createRoot(document.getElementById('root') as Element).render(
  <HashRouter>
    <I18nProvider i18n={i18n}>
      <App />
    </I18nProvider>
  </HashRouter>
)
