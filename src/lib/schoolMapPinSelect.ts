export const schoolMapPinSelect = {
  stub: true,
  name: true,
  address: true,
  neighborhood: true,
  priority: true,
  latitude: true,
  longitude: true,
  zipcode: true,
  school_type: true,
  volunteer_form_url: true,
  donation_url: true,
  programs: {
    select: {
      name: true,
      details: true,
      img: true,
      category: true,
    }
  },
} as const;