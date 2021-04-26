import { createStore } from '@colorfy-software/zfy'

import { StoresDataType } from '../../types/store-types'

export const initialState = {} as StoresDataType['user']

export default createStore<StoresDataType, 'user'>('user', initialState, {
  log: true,
  persist: { lazyRehydration: false },
})
