import { State } from 'zustand'

export type StoresNameType = keyof StoresDataType

export interface StoreType<D> extends State {
  data: D
  update: (producer: (store: StoreType<D>) => void) => void
  rehydrate?: (persistedData: { data: D }) => void
  reset: () => void
}

/**********************************
 *
 *              APP
 *
 **********************************/

export interface AppType {
  pushPermissions?: boolean
  isFirstDisplayOfHome?: boolean
  navigationState: 'auth' | 'app'
}

/**********************************
 *
 *             USER
 *
 **********************************/

export interface UserType {
  firstName?: string
  lastName?: string
  UID?: string
}

export interface StoresDataType {
  app: AppType
  user: UserType
}
