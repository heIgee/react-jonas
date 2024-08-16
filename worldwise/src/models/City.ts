import { Country } from './Country';

interface Position {
  lat: number;
  lng: number;
}

export interface City {
  cityName: string;
  country: Country;
  date: string; // ISO
  notes: string;
  position: Position;
  id: string;
}
