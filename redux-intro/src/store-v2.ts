import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import accountReducer from './features/accounts/accountSlice-v2';
import customerReducer from './features/customers/customerSlice-v2';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';

export const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// @ts-expect-error: leave me alone
export const store = legacy_createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;

export type IRootState = ReturnType<typeof rootReducer>;
export type IAppDispatch = typeof store.dispatch;

// // Get the type of our store variable
// export type AppStore = typeof store;
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore['getState']>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = AppStore['dispatch'];
