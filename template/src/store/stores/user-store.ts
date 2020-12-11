import { createStore } from '../stores'
import { UserType } from '../../types/store-types'

const data = {} as UserType

export default createStore('user', data, { logger: true, persist: true })
