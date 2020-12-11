import create, { StateCreator, UseStore } from 'zustand'
import produce from 'immer'

import persist from './middlewares/persist-middleware'
import logger from './middlewares/logger-middleware'

import userStore from './stores/user-store'
import themeStore from './stores/theme-store'

import { StoreType, StoresDataType, StoresNameType } from '../types/store-types'

// NOTE: Toggle store logging here (done based on Remote JS Debugging)
global.enableStoreLogging = global.__REMOTEDEV__

interface CreateStoreOptions {
  logger?: boolean
  persist?: boolean
}

/**
 * Function that creates and returns a zustand store
 *
 * @param store - Name of the store
 * @param data - Initial data of the store
 * @param options - (Optional) Config to use for store setup
 */
export function createStore<N extends StoresNameType>(
  name: N,
  data: StoresDataType[N],
  options?: CreateStoreOptions,
): UseStore<StoreType<StoresDataType[N]>> {
  const pipe = (
    ...fns: Array<
      (
        store: N,
        config: StateCreator<StoreType<StoresDataType[N]>>,
      ) => StateCreator<StoreType<StoresDataType[N]>>
    >
  ) => (
    n: N,
    s: StateCreator<StoreType<StoresDataType[N]>>,
  ): StateCreator<StoreType<StoresDataType[N]>> =>
    fns.length ? fns.reduce((c, f) => f(n, c), s) : s

  let middlewares: Array<
    (
      store: N,
      config: StateCreator<StoreType<StoresDataType[N]>>,
    ) => StateCreator<StoreType<StoresDataType[N]>>
  > = []
  if (options?.logger) middlewares = [...middlewares, logger]
  if (options?.persist) middlewares = [...middlewares, persist]

  const applyMiddlewares = pipe(...middlewares)

  return create<StoreType<StoresDataType[N]>>(
    applyMiddlewares(name, (set) => ({
      data,
      update: (producer): void => set(produce((store) => producer(store))),
      rehydrate: (persistedData: { data: StoresDataType[N] }): void =>
        set(persistedData),
      reset: (): void => set({ data }),
    })),
  )
}

// NOTE: We add all the stores we want to persist/reset here

// USER
const resetUser = userStore.getState().reset
const rehydrateUser = userStore.getState().rehydrate

// THEME
const resetTheme = themeStore.getState().reset
const rehydrateTheme = themeStore.getState().rehydrate

export function resetStores(): void {
  resetUser()
  resetTheme()
}

export default {
  user: { rehydrate: rehydrateUser },
  theme: { rehydrate: rehydrateTheme },
}
