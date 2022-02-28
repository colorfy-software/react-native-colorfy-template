import { initStores } from '@colorfy-software/zfy'

import type { StoresDataType } from '../types/store-types'

import appStore from './app-store'
import userStore from './user-store'

export const { stores, useStores } = initStores<StoresDataType>([appStore, userStore])
