import { configureStore } from '@reduxjs/toolkit';
import accountSlice from './features/accounts/accountSlice';
import customerSlice from './features/customers/customerSlice';
import { rootReducer, store } from './store-v2';

configureStore({
  reducer: {
    account: accountSlice,
    customer: customerSlice,
  },
});

export type IRootState = ReturnType<typeof rootReducer>;
export type IAppDispatch = typeof store.dispatch;
