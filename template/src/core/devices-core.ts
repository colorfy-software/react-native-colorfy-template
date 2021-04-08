// import { modalfy } from 'react-native-modalfy'
import devicesStore from '../store/stores/devices-store'
import appStore from '../store/stores/app-store'
// import userStore from '../store/stores/user-store'

import { DeviceType } from '../types/store-types'
// import { ModalsParamsType } from '../types/modals-types'
import core from './core'

// const { openModal } = modalfy<ModalsParamsType>()
const updateDevices = devicesStore.getState().update

// NOTE: Make sure to always write tests for every new method you add
class Devices {
  /**
   * Adds a new device to zustand
   *
   * @param fields - Object with device data that you want to update || add
   * @param options - Specific options for your operation
   */
  add = (
    data: DeviceType,
    options?: Partial<{ setAsCurrent: boolean }>,
  ): void => {
    updateDevices((devices) => {
      if (devices.data.current?.id === data.id) {
        console.error(
          `Device with ID ${data.id} already exists as the current device`,
        )
      } else if (devices.data.others.some((device) => device.id === data.id)) {
        console.error(
          `Device with ID ${data.id} already exists as a secondary device in the devices.data.others`,
        )
      } else {
        if (options?.setAsCurrent) devices.data.current = data
        else devices.data.others.push(data)
      }
    })
  }

  /**
   * Updates an existing device in zustand
   *
   * @param id - ID of the device you want to update
   * @param data - Object with device data that you want to update
   */
  update = (id: DeviceType['id'], data: Partial<DeviceType>): void => {
    updateDevices((devices) => {
      if (devices.data.current?.id === id) {
        devices.data.current = { ...devices.data.current, ...data }
      } else {
        const index = devices.data.others.findIndex(
          (device) => device.id === id,
        )

        if (index !== -1) {
          devices.data.others[index] = {
            ...devices.data.others[index],
            ...data,
          }
        } else {
          console.error(`Device with ID ${id} does not exist`)
        }
      }
    })
  }

  /**
   * Sets an existing device as the current one
   *
   * @param id - ID of the device you want to promote as current
   */
  setAsCurrent = (id: DeviceType['id']): void => {
    updateDevices((devices) => {
      const currentDevice = devices.data.current
      const newCurrentDevice = devices.data.others.find(
        (device) => device.id === id,
      )
      const index = devices.data.others.findIndex(
        (device) => device.id === newCurrentDevice?.id,
      )

      if (currentDevice?.id === id) {
        console.error(`Device with ID ${id} is already the current device`)
      } else if (!newCurrentDevice) {
        console.error(`Device with ID ${id} does not exist`)
      } else {
        devices.data.others.splice(index, 1)
        if (currentDevice) devices.data.others.push(currentDevice)
        devices.data.current = newCurrentDevice
      }
    })
  }

  /**
   * Removes an existing device from zustand
   *
   * @param id - ID of the device you want to remove from the store
   */
  remove = (id: DeviceType['id']): void => {
    updateDevices((devices) => {
      if (devices.data.current?.id === id) {
        devices.data.current = undefined
      } else {
        const index = devices.data.others.findIndex(
          (device) => device.id === id,
        )

        if (index !== -1) {
          devices.data.others.splice(index, 1)
        } else {
          console.error(`Device with ID ${id} does not exist`)
        }
      }
    })
  }

  /**
   * Enables/disables the mock device state in the app
   *
   * @param newState - New state of the mock functionality
   */
  toggleMockState = (newState?: boolean): void => {
    const isMockingDevice = appStore.getState().data.isMockingDevice
    core.app.update({ isMockingDevice: newState || !isMockingDevice })

    updateDevices((devices) => {
      if (newState) {
        devices.data.current = devices.data.mockDevice
      } else {
        devices.data.current = undefined
      }
    })
  }
}

export default new Devices()
