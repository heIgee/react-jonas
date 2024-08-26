export type ICustomerState = {
  nationalId: string | null;
  fullName: string | null;
  createdAt: string | null;
};

const initialCustomerState: ICustomerState = {
  fullName: null,
  nationalId: null,
  createdAt: null,
};

export type ICustomerAction =
  | {
      type: 'customer/createCustomer';
      payload: { fullName: string; nationalId: string; createdAt: string };
    }
  | {
      type: 'customer/updateName';
      payload: string;
    };

export default function customerReducer(
  state: ICustomerState = initialCustomerState,
  action: ICustomerAction,
): ICustomerState {
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
}

export const createCustomer = (
  fullName: string,
  nationalId: string,
): ICustomerAction => {
  return {
    type: 'customer/createCustomer',
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
};

export const updateName = (fullName: string): ICustomerAction => {
  return {
    type: 'customer/updateName',
    payload: fullName,
  };
};
