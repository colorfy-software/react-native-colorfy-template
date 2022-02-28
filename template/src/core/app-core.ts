import appStore from '../stores/app-store'

import type { AppType } from '../types/store-types'

const updateApp = appStore.getState().update

// NOTE: Make sure to always write tests for every new method you add
class App {
  /**
   * Updates the app store
   *
   * @param data - Object to update the app store with
   */
  update = (data: Partial<AppType>): void => {
    updateApp(app => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      app = Object.assign(app, data)
    })
  }
}

export default new App()
