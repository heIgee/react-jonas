import { Country } from './Country';

interface Position {
  lat: number;
  lng: number;
}

export interface City {
  id: string;
  cityName: string;
  country: Country;
  date: string; // ISO
  notes: string;
  position: Position;
}
