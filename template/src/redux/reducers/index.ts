import user, { UserState } from './user-reducer'

export default { user }

export interface StoreState {
  user: UserState
}
