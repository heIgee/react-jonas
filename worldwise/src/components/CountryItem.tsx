import styles from './CountryItem.module.css';
import FlagImg from './FlagImg';
import { Country } from '../models/Country';
import { flagEmojiToCode } from '../utils/flagEmojiToCode';

function CountryItem({ country }: { country: Country }) {
  const { countryName, emoji } = country;
  return (
    <li className={styles.countryItem}>
      <span>
        <FlagImg countryCode={flagEmojiToCode(emoji)} />
      </span>
      <span>{countryName}</span>
    </li>
  );
}

export default CountryItem;
