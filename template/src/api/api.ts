import { RequestTypes } from '../types/requests-types'
import requests from './requests'

export default function <K extends keyof RequestTypes>(
  request: K,
  params: RequestTypes[K]['params'],
): Promise<RequestTypes[K]['res']> {
  const call = requests[request]

  return new Promise(async (resolve, reject) => {
    if (call) {
      try {
        const response = await call(params)
        resolve(response)
      } catch (err) {
        reject(err)
      }
    } else {
      console.error(
        `${request} is not a valid request name.\n\nPossible requests are:${Object.keys(requests).map(
          c => `\n• ${c}`,
        )}`,
      )
    }
  })
}
