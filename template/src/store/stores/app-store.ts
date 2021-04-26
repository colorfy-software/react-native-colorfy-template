import { createStore } from '@colorfy-software/zfy'

import { StoresDataType } from '../../types/store-types'

export const initialState: StoresDataType['app'] = {
  navigationState: 'auth',
  pushPermissions: false,
  isFirstDisplayOfHome: true,
}

export default createStore<StoresDataType, 'app'>('app', initialState, { persist: { lazyRehydration: false } })
