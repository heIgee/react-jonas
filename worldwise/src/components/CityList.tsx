import { useCities } from '../context/CityContext';
import styles from './CityList.module.css';
import CityItem from './CityItem';
import Message from './Message';

export default function CityList() {
  console.warn('CITYLIST');
  const {
    cityState: { cities },
  } = useCities();

  /*   isLoading ? (
    <Spinner />
  ) :  */
  return !cities || !cities.length ? (
    <Message message='Add your first city by clicking on the map' />
  ) : (
    <ul className={styles.cityList}>
      {cities.map((c) => (
        <CityItem key={c.id} city={c} />
      ))}
    </ul>
  );
}
