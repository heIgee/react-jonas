import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import styles from './Map.module.css';
import FlagImg from './FlagImg';
import Button from './Button';
import { useCities } from '../context/CityContext';
import { useGeolocation } from '../hooks/useGeolocation';
import { useUrlLocation } from '../hooks/useUrlLocation';
import { flagEmojiToCode } from '../utils/flagEmojiToCode';

export default function Map() {
  const { cities, currentCity } = useCities();
  const { position: cityPosition } = currentCity ?? {
    position: /* Lichtenstein */ { lat: 47, lng: 9.5 },
  };

  const navigate = useNavigate();

  const {
    isLoading: isLoadingLocation,
    location: userLocation,
    getLocation,
  } = useGeolocation();

  useEffect(() => {
    userLocation &&
      navigate(`form?lat=${userLocation.lat}&lng=${userLocation.lng}`);
  }, [userLocation, navigate]);

  // TODO: map follows center, works bad with stated zoom
  // const [zoomLevel, setZoomLevel] = useState(currentCity ? 8 : 5);

  const urlLocation = useUrlLocation();
  const zoomLevel = currentCity || urlLocation ? 8 : 5;
  const { lat, lng } = urlLocation ?? cityPosition;

  // const [mapPosition, setMapPosition] = useState({ lat, lng });
  const mapPosition = { lat, lng };

  // useEffect(() => {
  //   setMapPosition({ lat, lng });
  // }, [lat, lng]);

  return (
    <div className={styles.mapContainer}>
      <Button variant='position' onClick={getLocation}>
        {isLoadingLocation ? 'Loading...' : 'Use your location'}
      </Button>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={zoomLevel}
        zoomControl={false}
      >
        <TileLayer url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png' />
        {cities &&
          cities.map((city) => (
            <Marker key={city.id} position={city.position}>
              <Popup>
                <span>
                  <FlagImg countryCode={flagEmojiToCode(city.country.emoji)} />
                </span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          ))}
        {/* {Array.from({ length: 125 }, (_, idx) => (
          <Marker
            key={crypto.randomUUID()}
            position={{ lat: 48, lng: -100 + idx * 10 }}
          ></Marker>
        ))} */}
        <MoveCenter position={mapPosition} zoom={zoomLevel} />
        <DetectClick />
        {/* <DetectZoom setZoom={(zoomLevel) => setZoomLevel(zoomLevel)} /> */}
      </MapContainer>
    </div>
  );
}

function MoveCenter({
  position,
  zoom,
}: {
  position: {
    lat: number;
    lng: number;
  };
  zoom: number;
}) {
  const map = useMap();
  const { lat, lng } = position;

  useEffect(() => {
    map.setView({ lat, lng }, zoom);
  }, [map, lat, lng, zoom]);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (ev) => {
      const { lat, lng } = ev.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });
  return null;
}

// function DetectZoom({ setZoom }: { setZoom: (zoomLevel: number) => void }) {
//   useMapEvents({
//     zoom: (ev) => {
//       setZoom(ev.target.getZoom());
//     },
//   });
//   return null;
// }
