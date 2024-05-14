export interface School {
  name: string;
  address?: string;
  sf_district?: string;
  students: number | null;
  free_reduced_lunch: string | null;
  ell: string | null;
  img: string;
  latitude: string;
  longitude: string;
  id: string;
}
