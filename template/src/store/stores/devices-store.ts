import { createStore } from '../stores'
import { DevicesType } from '../../types/store-types'

export const initialState: DevicesType = {
  current: undefined,
  others: [],
  mockDevice: {
    mocked: true,
    deviceIdentifier: 'mocked',
    firmwareVersion: '0.0.0-mocked',
    id: 'mocked',
    name: 'MyDevice',
    status: 'standby',
    updatedAt: new Date(),
    wiFiRSSI: '50',
    deviceTwin: {
      mac_address: '00:aa:00:a0:0a:0a',
    },
  },
}

export default createStore('devices', initialState, { persist: true })
