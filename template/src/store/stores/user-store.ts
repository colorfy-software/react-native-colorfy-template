import { createStore } from '../stores'
import { UserType } from '../../types/store-types'

export const initialState = {} as UserType

export default createStore('user', initialState, {
  logger: true,
  persist: true,
})
