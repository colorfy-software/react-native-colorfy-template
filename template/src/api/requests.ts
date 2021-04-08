import CONFIG from '../config/app-config'
import { LoginRequestType } from '../types/requests-types'

export const login = async (
  params: LoginRequestType['params'],
): Promise<LoginRequestType['res']> => {
  return new Promise((resolve, reject) => {
    fetch(`${CONFIG.END_POINT}/login`, {
      method: 'POST',
      body: JSON.stringify(params),
    })
      .then(async (res) => {
        const response = await res.json()
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default {
  login,
}
