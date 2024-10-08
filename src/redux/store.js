import { configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from '~/redux/activeBoard/activeBoardSlice'
import { userReducer } from '~/redux/user/userSlice'
import { combineReducers } from 'redux' // Có sẵn trong @reduxjs/toolkit
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user'] // only user will be persisted
}

const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  user: userReducer
})

const persistedReducer = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})
