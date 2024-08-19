import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import styles from './Form.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import Button from './Button';
import Message from './Message';
import Spinner from './Spinner';
import { useCities } from '../context/CityContext';
import { useUrlLocation } from '../hooks/useUrlLocation';
import { City } from '../models/City';
import { codeToFlagEmoji } from '../utils/codeToFlagEmoji';

const GEOCODE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode';

function Form() {
  console.warn('FORM');

  const navigate = useNavigate();

  const {
    cityState: { isLoading },
    postCity,
  } = useCities();

  const { lat, lng } = useUrlLocation() ?? { lat: 0, lng: 0 };

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState<string | null>(null);

  useEffect(() => {
    if (!lat || !lng) return;
    (async function fetchCity() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError(null);

        // TODO TODO TODO
        // 402/403 here breaks entire app
        // after using user location button,
        // city list redirects to form immediately

        const res = await fetch(
          `${GEOCODE_URL}?latitude=${lat}&longitude=${lng}`,
        );
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText);
        }
        const data = await res.json();
        if (!data.countryCode) {
          throw new Error('That does not seem to be a city');
        }

        setCityName(data.city || data.locality || '');
        setCountryName(data.countryName || '');
        setEmoji(codeToFlagEmoji(data.countryCode || ''));
      } catch (err) {
        console.error(err);
        setGeocodingError((err as Error)?.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    })();
  }, [lat, lng]);

  const [cityName, setCityName] = useState('');
  const [countryName, setCountryName] = useState('');
  const [emoji, setEmoji] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');

  const handleSubmit = async (ev: FormEvent) => {
    console.log(ev);
    ev.preventDefault();
    if (!cityName || !date) return;
    const newCity: City = {
      id: crypto.randomUUID(),
      cityName,
      country: { countryName, emoji },
      date: date.toString(),
      notes,
      position: { lat, lng },
    };
    await postCity(newCity);
    navigate('/app/cities');
  };

  if (isLoadingGeocoding) return <Spinner />;

  if (geocodingError) return <Message message={geocodingError} />;

  if (!lat || !lng) return <Message message='Click on some place on the map' />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        <DatePicker /* TODO too small */
          id='date'
          selected={date}
          dateFormat='dd/MM/yyyy'
          onChange={(date) => setDate(date ?? new Date())}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea
          id='notes'
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='submit' variant='primary' onClick={() => {}}>
          Add
        </Button>
        <Button variant='back' onClick={() => navigate(-1)}>
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
