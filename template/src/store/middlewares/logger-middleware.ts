import { StateCreator } from 'zustand'

import {
  MiddlewareType,
  StoresType,
  StoresNameType,
} from '../../types/store-types'

const middleware = <S extends StoresType>(
  store: StoresNameType,
  config: StateCreator<S>,
): MiddlewareType<S> => (set, get, api) =>
  config(
    (args) => {
      const prevState = get().data
      const payload = typeof args === 'function' ? args(get()).data : args
      set(args)
      const newState = get().data

      // @ts-ignore
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
