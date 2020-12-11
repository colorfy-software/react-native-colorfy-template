import { StateCreator } from 'zustand'

import {
  StoreType,
  StoresDataType,
  StoresNameType,
} from '../../types/store-types'

const middleware = <S extends StoresNameType>(
  store: S,
  config: StateCreator<StoreType<StoresDataType[S]>>,
): StateCreator<StoreType<StoresDataType[S]>> => (
  set,
  get,
  api,
): StoreType<StoresDataType[S]> =>
  config(
    (args) => {
      const prevState = get().data
      const payload = typeof args === 'function' ? args(get()).data : args
      set(args)
      const newState = get().data

      if (window.enableStoreLogging) {
        console.group(
          `%c🗂 ${store.toLocaleUpperCase()} STORE UPDATED`,
          'font-weight:bold',
        )
        console.log(
          '%cprevState',
          'font-weight:bold; color: #9E9E9E',
          prevState,
        )
        console.log('%cpayload', 'font-weight:bold; color: #27A3F7', payload)
        console.log('%cnewState', 'font-weight:bold; color: #C6E40A', newState)
        console.groupEnd()
      }
    },
    get,
    api,
  )

export default middleware
