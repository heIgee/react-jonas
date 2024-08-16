import { Country } from '../models/Country';
import { flagEmojiToPNG } from '../utils/flagEmojiToPNG';
import styles from './CountryItem.module.css';

function CountryItem({ country }: { country: Country }) {
  const { countryName, emoji } = country;
  return (
    <li className={styles.countryItem}>
      <span>{flagEmojiToPNG(emoji)}</span>
      <span>{countryName}</span>
    </li>
  );
}

export default CountryItem;
