import {
  createContext,
  ReactNode,
  Reducer,
  useContext,
  useReducer,
} from 'react';

import { User } from '../models/User';

interface FakeUserState {
  user: User | null;
  isAuthenticated: boolean;
}

const initState: FakeUserState = {
  user: null,
  isAuthenticated: false,
};

type FakeUserAction =
  | {
      type: 'login';
      user: User;
    }
  | {
      type: 'logout';
    };

const fakeUserReducer: Reducer<FakeUserState, FakeUserAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'login': {
      const { user } = action;
      return { ...state, user, isAuthenticated: true };
    }
    case 'logout': {
      return { ...state, user: null, isAuthenticated: false };
    }
    default: {
      throw new Error(`Invalid fake auth action: ${action}`);
    }
  }
};

interface FakeAuthContextType {
  fakeUserState: FakeUserState;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<FakeAuthContextType | undefined>(undefined);

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

export function FakeUserProvider({ children }: { children: ReactNode }) {
  const [fakeUserState, dispatchFakeUser] = useReducer(
    fakeUserReducer,
    initState,
  );

  const login = (email: string, password: string) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatchFakeUser({ type: 'login', user: FAKE_USER });
    }
  };

  const logout = () => {
    dispatchFakeUser({ type: 'logout' });
  };

  return (
    <AuthContext.Provider value={{ fakeUserState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFakeUser() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('FakeAuthContext must be used within a FakeAuthProvider');
  }
  return context;
}
