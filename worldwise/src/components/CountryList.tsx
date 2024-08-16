import { useCities } from '../context/CityContext';
import Spinner from './Spinner';
import Message from './Message';
import CountryItem from './CountryItem';
import { City } from '../models/City';
import { Country } from '../models/Country';
import styles from './CountryList.module.css';

export default function CountryList() {
  const { cities, isLoading } = useCities();
  // const countries = cities.map()
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
      console.log(countries);
      console.log(typeof countries[0]);
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
