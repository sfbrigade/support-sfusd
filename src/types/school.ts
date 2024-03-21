export interface School{
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  img?: string;
  district?: string;
  students?: string;
  frl?: string;
  ell?: string;
}

export interface SchoolMapList {
  img?: string;
  name?: string;
  district?: string;
  students?: string;
  frl?: string;
  ell?: string;
};