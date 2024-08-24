import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  Reducer,
  useReducer,
  useMemo,
  useCallback,
} from 'react';
import { City } from '../models/City';

interface CityState {
  cities: City[] | null;
  isLoading: boolean;
  currentCity: City | null;
  error: string | null;
}

type CityAction =
  | {
      type: 'cities/loaded';
      payload: City[];
    }
  | {
      type: 'loading';
      payload?: never;
    }
  | {
      type: 'rejected';
      payload: string;
    }
  | {
      type: 'city/selected';
      payload: City;
    }
  | {
      type: 'cities/created';
      payload: City;
    }
  | {
      type: 'cities/deleted';
      payload: string;
    };

const cityReducer: Reducer<CityState, CityAction> = (state, action) => {
  switch (action.type) {
    case 'cities/loaded': {
      const cities = action.payload;
      return { ...state, cities, isLoading: false };
    }
    case 'loading': {
      return { ...state, isLoading: true };
    }
    case 'rejected': {
      const error = action.payload;
      return { ...state, error, isLoading: false };
    }
    case 'city/selected': {
      const currentCity = action.payload;
      return { ...state, currentCity, isLoading: false };
    }
    case 'cities/created': {
      const newCity = action.payload;
      return {
        ...state,
        cities: state.cities ? [...state.cities, newCity] : null,
      };
    }
    case 'cities/deleted': {
      const idToDelete = action.payload;
      return {
        ...state,
        cities: state.cities
          ? state.cities.filter((city) => city.id !== idToDelete)
          : null,
      };
    }
    default: {
      throw new Error(`Invalid city action: ${action}`);
    }
  }
};

const initState: CityState = {
  cities: null,
  isLoading: false,
  currentCity: null,
  error: null,
};

interface CityContextType {
  cityState: CityState;
  getCity: (id: string) => Promise<void>;
  postCity: (newCity: City) => Promise<void>;
  deleteCity: (id: string) => Promise<void>;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export const SERVER_URL = 'http://localhost:8000';

export const CityProvider = ({ children }: { children: ReactNode }) => {
  const [cityState, dispatchCities] = useReducer(cityReducer, initState);

  useEffect(() => {
    dispatchCities({ type: 'loading' });
    fetch(`${SERVER_URL}/cities`)
      .then((res) => res.json())
      .then((data) => dispatchCities({ type: 'cities/loaded', payload: data }))
      .catch((err) => {
        console.error(err);
        dispatchCities({
          type: 'rejected',
          payload: err?.message || 'Error loading cities',
        });
      });
  }, []);

  const getCity = useCallback(
    async (id: string) => {
      if (id === cityState.currentCity?.id) return;
      dispatchCities({ type: 'loading' });
      fetch(`${SERVER_URL}/cities/${id}`)
        .then((res) => res.json())
        .then((data) => {
          dispatchCities({ type: 'city/selected', payload: data });
        })
        .catch((err) => {
          console.error(err);
          dispatchCities({
            type: 'rejected',
            payload: err?.message || 'Error getting city',
          });
        });
    },
    [cityState.currentCity?.id],
  );

  const postCity = useCallback(async (newCity: City) => {
    dispatchCities({ type: 'loading' });
    fetch(`${SERVER_URL}/cities`, {
      method: 'POST',
      body: JSON.stringify(newCity),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatchCities({ type: 'cities/created', payload: data });
        dispatchCities({ type: 'city/selected', payload: data });
      })
      .catch((err) => {
        console.error(err);
        dispatchCities({
          type: 'rejected',
          payload: err?.message || 'Error posting city',
        });
      });
  }, []);

  const deleteCity = useCallback(async (id: string) => {
    dispatchCities({ type: 'loading' });
    fetch(`${SERVER_URL}/cities/${id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((data) => {
        dispatchCities({ type: 'cities/deleted', payload: data?.id });
      })
      .catch((err) => {
        console.error(err);
        dispatchCities({
          type: 'rejected',
          payload: err?.message || 'Error deleting city',
        });
      });
  }, []);

  const providerValue = useMemo(
    () => ({
      cityState,
      getCity,
      postCity,
      deleteCity,
    }),
    [cityState, getCity, postCity, deleteCity],
  );

  return (
    <CityContext.Provider value={providerValue}>
      {children}
    </CityContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCities = (): CityContextType => {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error('CityContext must be used within a CityProvider');
  }
  return context;
};
