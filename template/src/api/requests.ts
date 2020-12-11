import CONFIG from '../config/app-config'
import { LoginRequestType } from '../types/request-types'

export const login = async (
  params: LoginRequestType['params'],
): Promise<LoginRequestType['res']> => {
  return new Promise((resolve, reject) => {
    fetch(`${CONFIG.END_POINT}/login`, {
      method: 'POST',
      body: JSON.stringify(params),
    })
      .then(async (res) => {
        if (res.ok && res.status === 200) {
          console.log(res)
          const response = await res.json()
          resolve(response)
        } else {
          // If status is not 200, but no error is present we throw an error with the whole response
          const response = await res.json()
          const stringyRes = JSON.stringify(response)
          throw new Error(stringyRes)
        }
      })
      .catch((err) => {
        console.log('login ERROR:', err)
        reject(err)
      })
  })
}

export default {
  login,
}
