/* eslint-disable camelcase */
import { State } from 'zustand'

export type StoresNameType = keyof StoresDataType

export interface StoreType<D> extends State {
  data: D
  update: (producer: (store: StoreType<D>) => void) => void
  rehydrate?: (persistedData: { data: D }) => void
  reset: () => void
}

/**********************************
 *
 *              APP
 *
 **********************************/

export interface AppType {
  isMockingDevice?: boolean
  isFirstDisplayOfDashboard?: boolean
  navigationState: 'auth' | 'app'
}

/**********************************
 *
 *            DEVICES
 *
 **********************************/

export interface DevicesType {
  current?: DeviceType
  others: DeviceType[]
  mockDevice: DeviceType
}

export type WashCycleStatusType = 'standby' | 'running'

export interface DeviceTwinType {
  // protocol_version: string
  // firmware_version: string
  // fragrance: 'low' | 'mid' | 'high'
  // soil: 'medium' | 'strong' | 'heavy'
  // wash_cycle_status: 'standby' | 'running'
  // lifetime_wash_cycle_count: string
  // wash_cycle_started_timestamp: string
  // wifi_rssi: string
  mac_address: string
  // timetoken: number
}

export type DeviceType = {
  mocked?: boolean
  firmwareVersion: string
  deviceIdentifier: string
  id: string
  name: string
  status?: WashCycleStatusType
  updatedAt?: Date
  wiFiRSSI: string
  deviceTwin?: DeviceTwinType
}

/**********************************
 *
 *             USER
 *
 **********************************/

export interface UserType {
  firstName?: string
  lastName?: string
  id?: string
}

export interface StoresDataType {
  app: AppType
  devices: DevicesType
  user: UserType
}
