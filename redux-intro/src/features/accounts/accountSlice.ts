import {
  Action,
  createSlice,
  PayloadAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';

export interface IAccountState {
  balance: number;
  loan: number;
  loanPurpose: string | null;
  isLoading: boolean;
}

const initialState: IAccountState = {
  balance: 0,
  loan: 0,
  loanPurpose: null,
  isLoading: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit: {
      prepare(amount: number, currency: string) {
        return { payload: { amount, currency } };
      },
      reducer(
        state,
        action: PayloadAction<{ amount: number; currency: string }>,
      ) {
        state.balance += action.payload.amount;
        state.isLoading = false;
      },
    },
    withdraw(state, action: PayloadAction<number>) {
      state.balance -= action.payload;
      state.isLoading = false;
    },
    requestLoan: {
      prepare(amount: number, purpose: string) {
        return { payload: { amount, purpose } };
      },
      reducer(
        state,
        action: PayloadAction<{ amount: number; purpose: string }>,
      ) {
        state.isLoading = false;
        if (state.loan > 0) return;
        const { amount, purpose } = action.payload;
        state.loan = amount;
        state.loanPurpose = purpose;
        state.balance += amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loanPurpose = null;
      state.loan = 0;
      state.isLoading = false;
    },
    loading(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;

export const deposit = (
  amount: number,
  currency: string,
):
  | ((dispatch: ThunkDispatch<IAccountState, void, Action>) => Promise<void>)
  | {
      type: string;
      payload: number;
    } => {
  if (currency === 'USD') {
    return {
      type: 'account/deposit',
      payload: amount,
    };
  }
  return async (dispatch) => {
    dispatch({ type: 'account/loading' });
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`,
      );
      const data = await res.json();
      console.log(data);
      const usdAmount = data.rates.USD;
      dispatch({
        type: 'account/deposit',
        payload: usdAmount,
      });
    } catch {
      // treat it as USD
      dispatch({
        type: 'account/deposit',
        payload: amount,
      });
    }
  };
};
