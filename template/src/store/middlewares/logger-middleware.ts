import { MiddlewareType, StoresType } from 'src/types/store-types'

const middleware: MiddlewareType = (store, config) => (
  set,
  get,
  api,
): StoresType =>
  config(
    args => {
      const oldData = get().data
      set(args)

      // @ts-ignore
      if (window.logZustand) {
        console.info(`🗂 ${store.toLocaleUpperCase()}_STORE_UPDATE: `, {
          prevState: oldData,
          nextState: get().data,
          payload: args,
        })
      }
    },
    get,
    api,
  )

export default middleware
