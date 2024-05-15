export interface School {
  name: string;
  address?: string;
  neighborhood?: string;
  students?: string;
  frl?: string;
  ell?: string;
  priority?: boolean;
  img?: string;
  latitude: number;
  longitude: number;
}

export interface SchoolMapList {
  img?: string;
  name?: string;
  neighbordhood?: string;
  students?: string;
  frl?: string;
  ell?: string;
}
