import { State } from 'zustand'

export type StoresNameType = keyof StoresDataType

export interface StoreType<D> extends State {
  data: D
  update: (producer: (store: StoreType<D>) => void) => void
  rehydrate?: (persistedData: { data: D }) => void
  reset: () => void
}

export interface StoresDataType {
  user: UserType
}

export interface UserType {
  firstName?: string
  lastName?: string
  id?: string
}
