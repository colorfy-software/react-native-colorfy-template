/* eslint-env detox/detox, jest */
import path from 'path'

import E2E_CONFIG from '../../src/config/e2e-config'

const describeFn =
  !E2E_CONFIG.RUN_ONLY || E2E_CONFIG.RUN_ONLY.includes(path.basename(__filename, '.e2e.js')) ? describe : describe.skip

describeFn('👋 Login screen', () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  it('renders the default elements', async () => {
    await expect(element(by.id('Login'))).toBeVisible()
    await expect(element(by.id('Login.Logo'))).toBeVisible()
    await expect(element(by.id('Login.Button'))).toBeVisible()
  })

  it('displays home after login button press', async () => {
    await expect(element(by.id('Login.Button'))).toBeVisible()
    await element(by.id('Login.Button')).tap()

    await expect(element(by.id('Home'))).toBeVisible()
    await expect(element(by.id('Home.Title'))).toBeVisible()
  })
})
