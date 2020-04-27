import { StateCreator, SetState, GetState, StoreApi } from 'zustand'
import { UserStoreType } from './user-types'

export interface CreateStoreType<S> {
  data: S
  update: (producer: (store: CreateStoreType<S>) => void) => void
  rehydrate?: (persistedData: { data: S }) => void
  reset: () => void
}

export type StoresType = UserStoreType

export type MiddlewareType = (
  store: string,
  config: StateCreator<StoresType>,
) => (
  set: SetState<StoresType>,
  get: GetState<StoresType>,
  api: StoreApi<StoresType>,
) => StoresType
