export interface School{
  name: string;
  address?: string;
  sf_district?: string;
  students?: string;
  free_reduced_lunch?: string;
  ell?: string;
  img?: string;
  latitude: number;
  longitude: number;
}

export interface SchoolMapList {
  img?: string;
  name?: string;
  sf_district?: string;
  students?: string;
  free_reduced_lunch?: string;
  ell?: string;
};