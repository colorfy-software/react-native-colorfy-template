import api from '../api/api'

import { resetStores } from '../store/stores'
import userStore from '../store/stores/user-store'
import themeStore from '../store/stores/theme-store'

import { LoginRequestType } from '../types/request-types'

const updateUser = userStore.getState().update
const updateTheme = themeStore.getState().update

class User {
  /**
   * Handles login request to backend using API middleware
   *
   * @see `src/api/api.ts`
   */
  login = async (params: LoginRequestType['params']): Promise<void> => {
    try {
      const data = await api('login', params)
      updateUser((user) => {
        user.data = data
      })

      // NOTE: Just used as an example
      updateTheme((theme) => {
        theme.data = {
          background: 'rebeccapurple',
          text: 'white',
        }
      })
    } catch (error) {
      console.log('❌ core.login', error)
    }
  }

  /**
   * Reset stores when logging out
   */
  logout = (): void => {
    resetStores()
  }
}

export default new User()
