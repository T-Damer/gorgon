import { atomWithStorage } from 'jotai/utils'

export type Languages = 'en' | 'ru' | 'uz'
export const prefix = 'gorgon'

export default atomWithStorage<{ language: Languages }>(
  `${prefix}:userStore`,
  { language: 'ru' },
  undefined,
  {
    getOnInit: true,
  }
)
