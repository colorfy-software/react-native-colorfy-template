import { MMKV } from 'react-native-mmkv'
import { createStore } from '@colorfy-software/zfy'

import type { StoresDataType } from '../types/store-types'

export const initialState = {} as StoresDataType['user']

export const storage = new MMKV({ id: 'user' })

export default createStore<StoresDataType['user']>('user', initialState, {
  persist: {
    getStorage: () => ({
      getItem: (name: string) => storage.getString(name) ?? null,
      setItem: (name: string, value: string) => storage.set(name, value),
      removeItem: (name: string) => storage.delete(name),
    }),
  },
})
