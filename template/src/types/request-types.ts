import { UserType } from './store-types'

export interface LoginRequestType {
  params: {
    email: string
    password: string
  }
  res: UserType
}

export interface RequestTypes {
  login: LoginRequestType
}
