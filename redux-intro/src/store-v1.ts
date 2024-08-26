import { combineReducers, legacy_createStore } from 'redux';

interface IAccountState {
  balance: number;
  loan: number;
  loanPurpose: string | null;
}

const initialAccountState: IAccountState = {
  balance: 0,
  loan: 0,
  loanPurpose: null,
};

interface ICustomerState {
  nationalId: string | null;
  fullName: string | null;
  createdAt: string | null;
}

const initialCustomerState: ICustomerState = {
  fullName: null,
  nationalId: null,
  createdAt: null,
};

const accountReducer = (
  state = initialAccountState,
  action: any,
): IAccountState => {
  switch (action.type) {
    case 'account/deposit': {
      return { ...state, balance: state.balance + action.payload };
    }
    case 'account/withdraw': {
      return { ...state, balance: state.balance - action.payload };
    }
    case 'account/requestLoan': {
      if (state.loan) return state;
      const { amount, purpose } = action.payload;
      return {
        ...state,
        loan: amount,
        loanPurpose: purpose,
        balance: state.balance + amount,
      };
    }
    case 'account/payLoan': {
      return {
        ...state,
        loan: 0,
        loanPurpose: null,
        balance: state.balance - state.loan,
      };
    }
    default:
      return state;
  }
};

const customerReducer = (
  state = initialCustomerState,
  action: any,
): ICustomerState => {
  switch (action.type) {
    case 'customer/createCustomer': {
      const { fullName, nationalId, createdAt } = action.payload;
      return { ...state, fullName, nationalId, createdAt };
    }
    case 'customer/updateName': {
      return { ...state, fullName: action.payload };
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = legacy_createStore(rootReducer);

const deposit = (amount: number) => ({
  type: 'account/deposit',
  payload: amount,
});

const withdraw = (amount: number) => ({
  type: 'account/withdraw',
  payload: amount,
});

const requestLoan = (amount: number, purpose: string) => ({
  type: 'account/requestLoan',
  payload: { amount, purpose },
});

const payLoan = () => ({
  type: 'account/payLoan',
});

store.dispatch(deposit(400));
console.log(store.getState().account);

store.dispatch(requestLoan(800, 'zhiguli'));
console.log(store.getState().account);

store.dispatch(withdraw(1100));
console.log(store.getState().account);

store.dispatch(payLoan());
console.log(store.getState().account);

////

const createCustomer = (fullName: string, nationalId: string) => {
  return {
    type: 'customer/createCustomer',
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
};

const updateName = (fullName: string) => {
  return {
    type: 'customer/updateName',
    payload: fullName,
  };
};

store.dispatch(createCustomer('Imbo Bimbo', '14887979'));
console.log(store.getState().customer);

store.dispatch(updateName('Rimbo Nimbo'));
console.log(store.getState().customer);
