import { configureStore } from '@reduxjs/toolkit'
import monHocReducer from './monhoc/monhocslince'

export const store = configureStore({
  reducer: {
    monHoc:monHocReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch