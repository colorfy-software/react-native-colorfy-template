import core from '../../src/core/core'
import devicesStore, {
  initialState,
} from '../../src/store/stores/devices-store'
import appStore from '../../src/store/stores/app-store'

describe('🧠 Core > devices:', () => {
  const newDevice = initialState.mockDevice

  beforeEach(() => {
    devicesStore.getState().reset()
  })

  it('add() populates zustand with a new current device', () => {
    core.devices.add(newDevice, { setAsCurrent: true })

    const { current, others } = devicesStore.getState().data
    expect(current).toStrictEqual(newDevice)
    expect(others).toStrictEqual([])

    expect.assertions(2)
  })

  it('add() populates zustand with a new secondary device', () => {
    core.devices.add(newDevice)

    const { current, others } = devicesStore.getState().data
    expect(others[0]).toStrictEqual(newDevice)
    expect(current).toBeUndefined()

    expect.assertions(2)
  })

  it('update() does update an existing current device', () => {
    core.devices.add(newDevice, { setAsCurrent: true })

    const deviceName = devicesStore.getState().data.current?.name
    expect(deviceName).toStrictEqual(newDevice.name)

    core.devices.update('mocked', { name: 'DeviceMockedCurrent' })

    const updatedDeviceName = devicesStore.getState().data.current?.name
    expect(updatedDeviceName).toStrictEqual('DeviceMockedCurrent')

    expect.assertions(2)
  })

  it('update() does update an existing secondary device', () => {
    core.devices.add(newDevice)

    const deviceName = devicesStore.getState().data.others[0]?.name
    expect(deviceName).toStrictEqual(newDevice.name)

    core.devices.update('mocked', { name: 'MyMockedSecondary' })
    const updatedDeviceName = devicesStore.getState().data.others[0]?.name
    expect(updatedDeviceName).toStrictEqual('MyMockedSecondary')

    expect.assertions(2)
  })

  it('setAsCurrent() sets an existing secondary device as the new current one and stores the previous current as a secondary device', () => {
    core.devices.add(newDevice, { setAsCurrent: true })
    core.devices.add({
      ...newDevice,
      id: 'mockedSecondary',
      name: 'MySideDevice',
    })

    core.devices.setAsCurrent('mockedSecondary')

    const { current, others } = devicesStore.getState().data
    expect(current?.name).toStrictEqual('MySideDevice')
    expect(others[0].name).toStrictEqual('MyDevice')
    expect(others.length).toBe(1)

    expect.assertions(3)
  })

  it('remove() deletes an existing device from zustand', () => {
    core.devices.add(newDevice, { setAsCurrent: true })
    core.devices.add({
      ...newDevice,
      id: 'mockedSecondary',
      name: 'MySideDevice',
    })

    core.devices.remove('mocked')
    core.devices.remove('mockedSecondary')

    const { current, others } = devicesStore.getState().data

    expect(current).toBeUndefined()
    expect(others).toStrictEqual([])

    expect.assertions(2)
  })

  it('toggleMockState() updates the mocked device feature state', () => {
    expect(appStore.getState().data.isMockingDevice).toBeFalsy()

    core.devices.toggleMockState()
    expect(appStore.getState().data.isMockingDevice).toBeTruthy()

    core.devices.toggleMockState(false)
    expect(appStore.getState().data.isMockingDevice).toBeFalsy()

    core.devices.toggleMockState(true)
    expect(appStore.getState().data.isMockingDevice).toBeTruthy()

    expect.assertions(4)
  })
})
