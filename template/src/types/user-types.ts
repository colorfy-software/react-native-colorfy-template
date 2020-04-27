import { CreateStoreType } from './store-types'

export interface UserType {
  firstName: string
  lastName: string
}

export type UserStoreType = CreateStoreType<UserType>
