import api from '../api/api'
import { LoginRequestType } from '../types/request-types'

class User {
  /**
   * Handles login request to backend using API middleware
   *
   * @see `src/api/api.ts`
   */
  login = async (params: LoginRequestType['params']): Promise<void> => {
    try {
      const user = await api('login', params)
      console.log({ user })

      // Do something with user
    } catch (error) {
      console.log('login ERROR:', error)
    }
  }
}

export default new User()
