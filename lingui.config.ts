import { LinguiConfig } from '@lingui/conf'

const config: LinguiConfig = {
  locales: ['en', 'ru', 'uz'],
  sourceLocale: 'ru',
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}/messages',
      include: ['src'],
    },
  ],
  fallbackLocales: {
    en: 'ru',
    uz: 'ru',
  },
  format: 'po',
  compileNamespace: 'ts',
}
export default config
