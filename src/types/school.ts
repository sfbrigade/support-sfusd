export interface School {
  id: string;
  name: string;
  address?: string;
  neighborhood?: string;
  priority: boolean;
  img?: string;
  latitude: number;
  longitude: number;
  profile?: SchoolProfile;
  metrics: Metric[];
  programs: Program[];
}

export interface SchoolProfile {
  about: string;
  about_bp: string[];
  volunteer_form_url: string;
  donation_url?: string;
  donation_text: string;
  testimonial?: string;
  testimonial_author?: string;
  testimonial_video?: string;
  testimonial_img?: string;
  noteable_video?: string;
  principal: string;
  instagram_url?: string;
  facebook_url?: string;
  website_url?: string;
}

export interface Metric {
  name: string;
  value: number;
  unit: string;
  category: string;
}

export interface Program {
  name: string;
  details: string;
  url?: string;
  img?: string;
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

export interface DropdownItem<ItemType> {
  label: string;
  value: string;
  item: ItemType;
}
