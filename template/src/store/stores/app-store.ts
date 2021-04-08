import { createStore } from '../stores'
import { AppType } from '../../types/store-types'

export const initialState: AppType = {
  navigationState: 'auth',
  pushPermissions: false,
  isFirstDisplayOfHome: true,
}

export default createStore('app', initialState, { persist: true })
