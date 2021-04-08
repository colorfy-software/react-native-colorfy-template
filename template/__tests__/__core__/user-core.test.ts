import core from '../../src/core/core'
import appStore, {
  initialState as initialAppState,
} from '../../src/store/stores/app-store'
import devicesStore, {
  initialState as initialDevicesState,
} from '../../src/store/stores/devices-store'
import userStore, {
  initialState as initialUserState,
} from '../../src/store/stores/user-store'
import { storesToReset } from '../../src/store/stores'

describe('🧠 Core > user:', () => {
  it.each([
    [{ firstName: 'J' }, { firstName: 'J' }],
    [{ firstName: 'John' }, { firstName: 'John' }],
    [{ lastName: 'Doe' }, { firstName: 'John', lastName: 'Doe' }],
    [{ firstName: undefined }, { firstName: undefined, lastName: 'Doe' }],
    [
      { id: '42', firstName: 'John' },
      { id: '42', firstName: 'John', lastName: 'Doe' },
    ],
  ])('update() does update the store', (updateData, expectedStore) => {
    core.user.update(updateData)
    const updatedStore = userStore.getState().data
    expect(updatedStore).toStrictEqual(expectedStore)
  })

  it('isLoggedIn() returns the correct state of login', () => {
    core.user.update({ id: '42' })
    const isLoggedInA = core.user.isLoggedIn()
    expect(isLoggedInA).toBeTruthy()

    core.user.logout()
    const isLoggedInB = core.user.isLoggedIn()
    expect(isLoggedInB).toBeFalsy()

    expect.assertions(2)
  })

  it('logout() resets stores properly', () => {
    // NOTE: We first populate the stores to be sure that they're indeed being reset afterwards
    core.user.update({ id: '42' })
    const userID = userStore.getState().data.id

    expect(userID).toStrictEqual('42')

    // NOTE: Now we make sure we test all the expected stores were reset
    const resetStores = core.user.logout()
    expect(resetStores).toStrictEqual(storesToReset)

    resetStores.forEach((store) => {
      switch (store) {
        case 'app': {
          const resetAppState = appStore.getState().data
          expect(resetAppState).toStrictEqual(initialAppState)
          break
        }
        case 'devices': {
          const resetDevicesState = devicesStore.getState().data
          expect(resetDevicesState).toStrictEqual(initialDevicesState)
          break
        }
        case 'user': {
          const resetUserState = userStore.getState().data
          expect(resetUserState).toStrictEqual(initialUserState)
          break
        }
        default:
          throw Error(
            `Some being reset by core.user.logout() is not being tested by Jest`,
          )
      }
    })

    expect.assertions(5)
  })
})
