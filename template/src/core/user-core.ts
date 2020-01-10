import reduxStore from '../redux/store'
import { updateUser, UserState } from '../redux/reducers/user-reducer'

class User {
  /**
   * Updates the user object in redux with data provided
   *
   * @param { Object } fields - Object with user data that you want to update || add
   */
  updateUser = (fields: UserState): void => {
    reduxStore.dispatch(updateUser(fields))
  }
}

export default new User()
