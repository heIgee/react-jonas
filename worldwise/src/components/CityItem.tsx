import { Link } from 'react-router-dom';
import { City } from '../models/City';
import { flagEmojiToPNG } from '../utils/flagEmojiToPNG';
import { formatISODate } from '../utils/formatISODate';
import styles from './CityItem.module.css';

export default function CityItem({ city }: { city: City }) {
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
        /* to={id} does not work */
        to={`${id}?lat=${lat}&lng=${lng}`}
        className={styles.cityItem}
      >
        <span className={styles.emoji}>{flagEmojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatISODate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
