import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { City } from '../models/City';

interface CityContextType {
  cities: City[] | null;
  isLoading: boolean;
  currentCity: City | null;
  getCity: (id: string) => Promise<void>;
  postCity: (newCity: City) => Promise<void>;
  deleteCity: (id: string) => Promise<void>;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export const SERVER_URL = 'http://localhost:8000';

export const CityProvider = ({ children }: { children: ReactNode }) => {
  const [cities, setCities] = useState<City[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCity, setCurrentCity] = useState<City | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${SERVER_URL}/cities`)
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const getCity = async (id: string) => {
    setIsLoading(true);
    fetch(`${SERVER_URL}/cities/${id}`)
      .then((res) => res.json())
      .then((data) => setCurrentCity(data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  const postCity = async (newCity: City) => {
    setIsLoading(true);
    fetch(`${SERVER_URL}/cities`, {
      method: 'POST',
      body: JSON.stringify(newCity),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCities((prev) => (prev ? [...prev, data] : null));
        setCurrentCity(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  const deleteCity = async (id: string) => {
    setIsLoading(true);
    fetch(`${SERVER_URL}/cities/${id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((data) => {
        setCities((prev) =>
          prev ? prev.filter((c) => c.id !== data.id) : null,
        );
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <CityContext.Provider
      value={{ cities, isLoading, currentCity, getCity, postCity, deleteCity }}
    >
      {children}
    </CityContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCities = (): CityContextType => {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error('useCityContext must be used within a CityProvider');
  }
  return context;
};
