import create, { StateCreator, UseStore } from 'zustand'
import produce from 'immer'

import { StoreType, StoresDataType, StoresNameType } from '../types/store-types'

import CONFIG from '../config/app-config'

import persist from './middlewares/persist-middleware'
import logger from './middlewares/logger-middleware'

import appStore from './stores/app-store'
import userStore from './stores/user-store'

// NOTE: Toggle store logging here (done based on Remote JS Debugging state)
global.enableStoreLogging = CONFIG.IS_REMOTE_DEBUGGING

interface CreateStoreOptions {
  logger?: boolean
  persist?: boolean
}

/**
 * Function that creates and returns a zustand store.
 * @param store - `string`— Name of the store.
 * @param data - `StoresDataType`— Initial data of the store.
 * @param options - `CreateStoreOptions`— Optional. Config to use for store setup.
 */
export function createStore<N extends StoresNameType>(
  name: N,
  data: StoresDataType[N],
  options?: CreateStoreOptions,
): UseStore<StoreType<StoresDataType[N]>> {
  const pipe = (
    ...fns: Array<
      (store: N, config: StateCreator<StoreType<StoresDataType[N]>>) => StateCreator<StoreType<StoresDataType[N]>>
    >
  ) => (n: N, s: StateCreator<StoreType<StoresDataType[N]>>): StateCreator<StoreType<StoresDataType[N]>> =>
    fns.length ? fns.reduce((c, f) => f(n, c), s) : s

  let middlewares: Array<
    (store: N, config: StateCreator<StoreType<StoresDataType[N]>>) => StateCreator<StoreType<StoresDataType[N]>>
  > = []
  if (options?.logger) middlewares = [...middlewares, logger]
  if (options?.persist) middlewares = [...middlewares, persist]

  const applyMiddlewares = pipe(...middlewares)

  return create<StoreType<StoresDataType[N]>>(
    applyMiddlewares(name, set => ({
      data,
      update: (producer): void => set(produce(store => producer(store))),
      rehydrate: (persistedData: { data: StoresDataType[N] }): void => set(persistedData),
      reset: (): void => set({ data }),
    })),
  )
}

// NOTE: We add all the stores we want to persist/reset here
export const storesToReset: (keyof StoresDataType)[] = ['app', 'user']
export const storesToRehydrate: (keyof StoresDataType)[] = storesToReset

export function resetStores(): (keyof StoresDataType)[] {
  appStore?.getState().reset?.()
  userStore?.getState().reset?.()
  // NOTE: We return this array to help test from Jest
  // that the proper stores were reset
  return storesToReset
}
