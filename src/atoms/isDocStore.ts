import { atomWithStorage } from 'jotai/utils'
import { prefix } from './userStore'

export default atomWithStorage<boolean>(`${prefix}:isDoc`, false, undefined, {
  getOnInit: true,
})
