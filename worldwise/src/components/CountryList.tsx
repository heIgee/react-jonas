import styles from './CountryList.module.css';
import Spinner from './Spinner';
import Message from './Message';
import CountryItem from './CountryItem';
import { useCities } from '../context/CityContext';
import { City } from '../models/City';
import { Country } from '../models/Country';

export default function CountryList() {
  const {
    cityState: { cities, isLoading },
  } = useCities();
  return isLoading ? (
    <Spinner />
  ) : !cities || !cities.length ? (
    <Message message='Add your first city by clicking on the map' />
  ) : (
    (() => {
      const countries: Country[] = cities
        .reduce(
          (acc: City[], cur) => (acc.includes(cur) ? acc : [...acc, cur]),
          [],
        )
        .map((city) => city.country);
      return (
        <ul className={styles.countryList}>
          {countries.map((c) => (
            <CountryItem key={crypto.randomUUID()} country={c} />
          ))}
        </ul>
      );
    })()
  );
}
