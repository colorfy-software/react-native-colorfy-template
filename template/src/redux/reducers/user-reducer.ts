const RESET_APP = 'RESET_APP'
const UPDATE_USER = 'UPDATE_USER'
const INITIAL_STATE: UserState = {
  firstName: null,
}

export default function(
  state = INITIAL_STATE,
  action: UserActionTypes,
): UserState {
  switch (action.type) {
    case RESET_APP:
      return INITIAL_STATE
    case UPDATE_USER: {
      return { ...state, ...action.payload }
    }
    default:
      return state
  }
}

export const updateUser = (payload: UserState): UpdateUserAction => ({
  type: UPDATE_USER,
  payload,
})

export interface UserState {
  /**
   * @description User's first name
   */
  firstName?: string | null
}

interface UpdateUserAction {
  type: typeof UPDATE_USER
  payload: UserState
}

interface ResetAppAction {
  type: typeof RESET_APP
}

type UserActionTypes = UpdateUserAction | ResetAppAction
