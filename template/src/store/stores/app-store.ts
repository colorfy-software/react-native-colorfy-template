import { createStore } from '../stores'
import { AppType } from '../../types/store-types'

export const initialState: AppType = {
  navigationState: 'auth',
  isMockingDevice: false,
  isFirstDisplayOfDashboard: true,
}

export default createStore('app', initialState, { persist: true })
