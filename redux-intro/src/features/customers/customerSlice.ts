import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ICustomerState = {
  nationalId: string | null;
  fullName: string | null;
  createdAt: string | null;
};

const initialState: ICustomerState = {
  fullName: null,
  nationalId: null,
  createdAt: null,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName: string, nationalId: string) {
        return {
          payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(
        state,
        action: PayloadAction<{
          fullName: string;
          nationalId: string;
          createdAt: string;
        }>,
      ) {
        const { fullName, nationalId, createdAt } = action.payload;
        state.fullName = fullName;
        state.nationalId = nationalId;
        state.createdAt = createdAt;
      },
    },
    updateName(state, action: PayloadAction<string>) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;
