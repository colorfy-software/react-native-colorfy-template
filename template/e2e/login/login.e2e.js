/* eslint-env detox/detox, jest */

describe('👋 Login screen', () => {
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
