import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './CityCard.module.css';
import Button from './Button';
import FlagImg from './FlagImg';
import Spinner from './Spinner';
import { useCities } from '../context/CityContext';
import { flagEmojiToCode } from '../utils/flagEmojiToCode';
import { formatISODate } from '../utils/formatISODate';

export default function CityCard() {
  const { id } = useParams();
  const {
    cityState: { currentCity, isLoading },
    getCity,
  } = useCities();

  const navigate = useNavigate();

  useEffect(() => {
    id && getCity(id);
  }, [id, getCity]);

  if (isLoading) return <Spinner />;

  if (!currentCity) return;

  const {
    cityName,
    country: { emoji },
    date,
    notes,
  } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>
            <FlagImg countryCode={flagEmojiToCode(emoji)} />
          </span>
          {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{date && formatISODate(date)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target='_blank'
          rel='noreferrer'
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button variant='back' onClick={() => navigate(-1)}>
          &larr; Back
        </Button>
      </div>
    </div>
  );
}
