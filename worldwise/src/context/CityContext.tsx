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
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export const SERVER_URL = 'http://localhost:8000';

export const CityProvider = ({ children }: { children: ReactNode }) => {
  const [cities, setCities] = useState<City[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${SERVER_URL}/cities`)
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <CityContext.Provider value={{ cities, isLoading }}>
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
