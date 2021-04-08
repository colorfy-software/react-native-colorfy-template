import core from '../../src/core/core'
import { storesToReset } from '../../src/store/stores'
import appStore, { initialState as initialAppState } from '../../src/store/stores/app-store'
import userStore, { initialState as initialUserState } from '../../src/store/stores/user-store'

describe('🙍 Core > user:', () => {
  it.each([
    [{ UID: '42' }, { UID: '42' }],
    [{ UID: '43' }, { UID: '43' }],
    [{ isActive: true }, { UID: '43', isActive: true }],
    [{ UID: undefined }, { UID: undefined, isActive: true }],
    [
      { UID: '42', emails: { unverified: ['test@jest.com'] } },
      { UID: '42', emails: { unverified: ['test@jest.com'] }, isActive: true },
    ],
  ])('update() does update the store', (updateData, expectedStore) => {
    // @ts-expect-error NOTE: We know the argument isn't a complete user object.
    core.user.update(updateData)
    const updatedStore = userStore.getState().data
    expect(updatedStore).toStrictEqual(expectedStore)
  })

  it('logout() resets stores properly', async () => {
    // NOTE: We first populate the stores to be sure that they're indeed being reset afterwards
    core.user.update({ UID: '42' })
    const userID = userStore.getState().data.UID

    expect(userID).toStrictEqual('42')

    // NOTE: Now we make sure we test all the expected stores were reset
    const resetStores = await core.user.logout()
    expect(resetStores).toStrictEqual(storesToReset)

    resetStores?.forEach(store => {
      switch (store) {
        case 'app': {
          const resetAppState = appStore.getState().data
          expect(resetAppState).toStrictEqual(initialAppState)
          break
        }
        case 'user': {
          const resetUserState = userStore.getState().data
          expect(resetUserState).toStrictEqual(initialUserState)
          break
        }
        default:
          throw Error(`Some store being reset by core.user.logout() is not being tested by Jest`)
      }
    })

    expect.assertions(4)
  })
})
