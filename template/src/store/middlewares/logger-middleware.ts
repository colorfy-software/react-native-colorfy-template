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
      const oldData = get().data
      set(args)

      // @ts-ignore
      if (window.enableStoreLogging) {
        console.info(`🗂 ${store.toLocaleUpperCase()}_STORE_UPDATE: `, {
          prevState: oldData,
          nextState: get().data,
          payload: args,
        })
      }
    },
    get,
    api,
  )

export default middleware
