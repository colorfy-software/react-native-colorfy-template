import { combineReducers, createStore, applyMiddleware } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
// import logger from 'redux-logger'
import AsyncStorage from '@react-native-community/async-storage'

import reducers from './reducers'

const persistConfig = {
  key: 'app',
  storage: AsyncStorage,
  timeout: 0,
  whitelist: [],
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({ ...reducers }),
)

// const store = createStore(persistedReducer, applyMiddleware(logger))
const store = createStore(persistedReducer)

const persistor = persistStore(store)

export default store
export { persistor }
