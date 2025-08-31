select
  a.id,
  a.name,
  a.address,
  a.neighborhood,
  a.priority,
  a.img,
  a.latitude,
  a.longitude,
  a.zipcode,
  b.about,
  array_to_string(b.about_bp, E'\n') as about_bp,
  b.volunteer_form_url,
  b.donation_text,
  b.testimonial,
  b.testimonial_author,
  b.testimonial_video,
  b.testimonial_img,
  b.noteable_video,
  b.principal,
  b.instagram_url,
  b.facebook_url,
  b.website_url
from "School" a
join "SchoolProfile" b
on a.id = b."schoolId"