import appStore from '../store/stores/app-store'

import { AppType } from '../types/store-types'

const updateApp = appStore.getState().update

// NOTE: Make sure to always write tests for every new method you add
class App {
  /**
   * Updates the app store
   *
   * @param data - Object to update the app store with
   */
  update = (data: Partial<AppType>): void => {
    const currentData = appStore.getState().data
    updateApp((app) => {
      app.data = { ...currentData, ...data }
    })
  }
}

export default new App()
