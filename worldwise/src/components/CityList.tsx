import { useCities } from '../context/CityContext';
import styles from './CityList.module.css';
import CityItem from './CityItem';
import Message from './Message';
import Spinner from './Spinner';

export default function CityList() {
  const {
    cityState: { cities, isLoading },
  } = useCities();

  return isLoading ? (
    <Spinner />
  ) : !cities || !cities.length ? (
    <Message message='Add your first city by clicking on the map' />
  ) : (
    <ul className={styles.cityList}>
      {cities.map((c) => (
        <CityItem key={c.id} city={c} />
      ))}
    </ul>
  );
}
