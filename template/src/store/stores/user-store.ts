import create, { SetState } from 'zustand'
import produce, { Draft } from 'immer'

import { UserType, UserStoreType } from '../../types/user-types'
import persist from '../middlewares/persist-middleware'
import logger from '../middlewares/logger-middleware'

const data = {} as UserType
// ℹ️ This as to be done outside of the declaration
// so that TS won't complain that the other UserType
// keys are missing. If we know all the keys in advance
// we can simply go back to a more conventional
// declaration & typing
data.firstName = 'Tim'
data.lastName = 'Allen'

// ℹ️ All the stores should have at least the `logger` middleware,
// which can be activated/deactivated from `/stores/stores/index.ts`.
// If you want your store to be persisted, just add the `persist`
// middleware. NB: All the store will follow the same internal
// structure to reduce mental overhead when it comes to using
// them. This will be enforced by the way we create store types.
const [userStore, userStoreApi] = create<UserStoreType>(
  logger(
    'user',
    persist(
      'user',
      (set: SetState<UserStoreType>): UserStoreType => ({
        data,
        update: (producer): void =>
          set(produce((store: Draft<UserStoreType>) => producer(store))),
        rehydrate: (persistedData: { data: UserType }): void =>
          set(persistedData),
        reset: (): void => set({ data }),
      }),
    ),
  ),
)

export { userStore, userStoreApi }
