import core from '../../src/core/core'
import appStore, { initialState } from '../../src/stores/app-store'

describe('📱 Core > app:', () => {
  it.each([
    [{ isFirstDisplayOfHome: true }, initialState],
    [{ isFirstDisplayOfHome: false }, { ...initialState, isFirstDisplayOfHome: false }],
    [
      { pushPermissions: false },
      {
        ...initialState,
        isFirstDisplayOfHome: false,
        pushPermissions: false,
      },
    ],
  ])('update() does update the store', (updateData, expectedStore) => {
    core.app.update(updateData)
    const updatedStore = appStore.getState().data
    expect(updatedStore).toStrictEqual(expectedStore)

    expect.assertions(1)
  })
})
