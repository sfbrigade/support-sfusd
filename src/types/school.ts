export interface School {
  name: string;
  address?: string;
  neighborhood?: string;
  students?: number;
  frl?: number;
  ell?: number;
  ssn?: number;
  priority: boolean;
  img?: string;
  latitude: number;
  longitude: number;
  profile?: SchoolProfile;
  metrics: Metric[];
}

export interface SchoolProfile {
  about: string;
  about_bp: string[];
  testimonial?: string;
  principal: string;
  instagram_url?: string;
  facebook_url?: string;
  website_url?: string;
}

export interface Metric {
  name: string;
  percentage: number;
  category: string;
}

export interface SchoolMapList {
  img?: string;
  name?: string;
  neighbordhood?: string;
  students?: string;
  frl?: string;
  ell?: string;
}
