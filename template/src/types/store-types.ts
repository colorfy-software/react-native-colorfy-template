import { StateCreator, SetState, GetState, StoreApi } from 'zustand'
import { UserStoreType } from './user-types'

export interface CreateStoreType<S> {
  data: S
  update: (producer: (store: CreateStoreType<S>) => void) => void
  rehydrate?: (persistedData: { data: S }) => void
  reset: () => void
}

export type StoresType = UserStoreType
export type StoresNameType = 'user'

export type MiddlewareType<S> = (
  set: SetState<S>,
  get: GetState<S>,
  api: StoreApi<S>,
) => S
