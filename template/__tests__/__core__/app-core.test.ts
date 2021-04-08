import core from '../../src/core/core'
import appStore, { initialState } from '../../src/store/stores/app-store'

describe('🧠 Core > app:', () => {
  it.each([
    [{ isMockingDevice: true }, { ...initialState, isMockingDevice: true }],
    [{ isMockingDevice: false }, initialState],
    [
      { isMockingDevice: true, isFirstDisplayOfDashboard: false },
      {
        ...initialState,
        isMockingDevice: true,
        isFirstDisplayOfDashboard: false,
      },
    ],
  ])('update() does update the store', (updateData, expectedStore) => {
    core.app.update(updateData)
    const updatedStore = appStore.getState().data
    expect(updatedStore).toStrictEqual(expectedStore)
  })
})
