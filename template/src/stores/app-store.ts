import { MMKV } from 'react-native-mmkv'
import { createStore } from '@colorfy-software/zfy'

import type { StoresDataType } from '../types/store-types'

export const initialState: StoresDataType['app'] = {
  navigationState: 'auth',
  pushPermissions: false,
  isFirstDisplayOfHome: true,
}

export const storage = new MMKV({ id: 'app' })

export default createStore<StoresDataType['app']>('app', initialState, {
  log: true,
  persist: {
    getStorage: () => ({
      getItem: (name: string) => storage.getString(name) ?? null,
      setItem: (name: string, value: string) => storage.set(name, value),
      removeItem: (name: string) => storage.delete(name),
    }),
  },
})
