import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';
import FlagImg from './FlagImg';
import { useCities } from '../context/CityContext';
import { City } from '../models/City';
import { flagEmojiToCode } from '../utils/flagEmojiToCode';
import { formatISODate } from '../utils/formatISODate';

export default function CityItem({ city }: { city: City }) {
  const { currentCity, deleteCity } = useCities();
  const {
    cityName,
    country: { emoji },
    date,
    id,
    position: { lat, lng },
  } = city;
  return (
    <li>
      <Link
        /* to={id} does not work but {`${id}`} does */
        to={`${id}?lat=${lat}&lng=${lng} `}
        className={`${styles.cityItem} ${
          currentCity?.id === city.id ? styles['cityItem--active'] : ''
        }`}
      >
        <span className={styles.emoji}>
          <FlagImg countryCode={flagEmojiToCode(emoji)} />
        </span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatISODate(date)}</time>
        <button
          onClick={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            deleteCity(id);
          }}
          className={styles.deleteBtn}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}
