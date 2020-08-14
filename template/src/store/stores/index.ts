import { userStoreApi } from './user-store'

// NOTE: Enable/disable store logging here
// @ts-ignore
window.enableStoreLogging = true

// NOTE: We have to add every store we want to persist/reset here
// USER
const rehydrateUser = userStoreApi.getState().rehydrate
const resetUser = userStoreApi.getState().reset

// NOTE: Add stores you want to have persisted & rehydrated here
export default {
  user: { rehydrate: rehydrateUser },
}

export function resetStores() {
  resetUser()
}
