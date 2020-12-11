import { createStore } from '../stores'
import { ThemeType } from '../../types/store-types'

const data: ThemeType = {
  background: 'pink',
  text: 'black',
}

export default createStore('theme', data, { persist: true })
