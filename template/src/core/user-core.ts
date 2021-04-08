import { resetStores } from '../store/stores'
import userStore from '../store/stores/user-store'

import { UserType, StoresDataType } from '../types/store-types'

const updateUser = userStore.getState().update

// NOTE: Make sure to always write tests for every new method you add
class User {
  /**
   * Updates the user store
   *
   * @param data - Object to update the user store with
   */
  update = (data: Partial<UserType>): void => {
    const currentData = userStore.getState().data
    updateUser(user => {
      user.data = { ...currentData, ...data }
    })
  }

  /**
   * Returns if user is logged in. Uses ID from user store to determine logged in state
   */
  isLoggedIn = (): boolean => Boolean(userStore.getState().data.UID)

  /**
   * Reset stores when logging out
   */
  logout = (): (keyof StoresDataType)[] => resetStores()
}

export default new User()
