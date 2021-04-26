import { StoresDataType } from '../types/store-types'

import appStore from './stores/app-store'
import userStore from './stores/user-store'

// NOTE: We add all the stores we want to reset here
export const storesToReset: (keyof StoresDataType)[] = ['app', 'user']

export function resetStores(): (keyof StoresDataType)[] {
  appStore?.getState().reset?.()
  userStore?.getState().reset?.()
  // NOTE: We return this array to help test from Jest
  // that the proper stores were reset
  return storesToReset
}
