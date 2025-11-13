import { LinguiConfig } from '@lingui/conf'

const config: LinguiConfig = {
  locales: ['en', 'ru'],
  sourceLocale: 'ru',
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}/messages',
      include: ['src'],
    },
  ],
  fallbackLocales: {
    en: 'ru',
  },
  format: 'po',
  compileNamespace: 'ts',
}
export default config
