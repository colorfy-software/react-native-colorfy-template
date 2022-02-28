import { stores } from '../stores/stores'
import userStore from '../stores/user-store'

import type { UserType } from '../types/store-types'

const updateUser = userStore.getState().update

// NOTE: Make sure to always write tests for every new method you add
class User {
  /**
   * Updates the user store
   *
   * @param data - Object to update the user store with
   */
  update = (data: Partial<UserType>): void => {
    updateUser(user => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      user = Object.assign(user, data)
    })
  }

  /**
   * Returns if user is logged in. Uses ID from user store to determine logged in state
   */
  isLoggedIn = (): boolean => Boolean(userStore.getState().data.UID)

  /**
   * Reset stores when logging out
   */
  logout = () => stores.reset()
}

export default new User()
