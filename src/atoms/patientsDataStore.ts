import { atomWithStorage } from 'jotai/utils'
import { prefix } from './userStore'

export type PatientsDataStore = { questionId: number; answerId: number }[]

export default atomWithStorage<PatientsDataStore>(
  `${prefix}:patientsData`,
  [],
  undefined,
  {
    getOnInit: true,
  }
)
