import { ThunkDispatch } from 'redux-thunk';

export interface IAccountState {
  balance: number;
  loan: number;
  loanPurpose: string | null;
  isLoading: boolean;
}

const initialAccountState: IAccountState = {
  balance: 0,
  loan: 0,
  loanPurpose: null,
  isLoading: false,
};

export type IAccountAction =
  | {
      type: 'account/deposit';
      payload: number;
    }
  | {
      type: 'account/withdraw';
      payload: number;
    }
  | {
      type: 'account/requestLoan';
      payload: { amount: number; purpose: string };
    }
  | {
      type: 'account/payLoan';
    }
  | {
      type: 'account/loading';
    };

export default function accountReducer(
  state: IAccountState = initialAccountState,
  action: IAccountAction,
): IAccountState {
  switch (action.type) {
    case 'account/deposit': {
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    }
    case 'account/withdraw': {
      return {
        ...state,
        balance: state.balance - action.payload,
        isLoading: false,
      };
    }
    case 'account/requestLoan': {
      if (state.loan) return state;
      const { amount, purpose } = action.payload;
      return {
        ...state,
        loan: amount,
        loanPurpose: purpose,
        balance: state.balance + amount,
        isLoading: false,
      };
    }
    case 'account/payLoan': {
      return {
        ...state,
        loan: 0,
        loanPurpose: null,
        balance: state.balance - state.loan,
        isLoading: false,
      };
    }
    case 'account/loading': {
      return {
        ...state,
        isLoading: true,
      };
    }
    default:
      return state;
  }
}

export const deposit = (
  amount: number,
  currency: string,
):
  | ((
      dispatch: ThunkDispatch<IAccountState, void, IAccountAction>,
    ) => Promise<void>)
  | IAccountAction => {
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

export const withdraw = (amount: number): IAccountAction => ({
  type: 'account/withdraw',
  payload: amount,
});

export const requestLoan = (
  amount: number,
  purpose: string,
): IAccountAction => ({
  type: 'account/requestLoan',
  payload: { amount, purpose },
});

export const payLoan = (): IAccountAction => ({
  type: 'account/payLoan',
});
