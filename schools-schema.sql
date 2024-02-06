CREATE TABLE schools (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    sf_district TEXT NOT NULL,
    students NUMERIC,
    free_reduced_lunch TEXT,
    ell TEXT,
    color TEXT,
    img TEXT,
    latitude NUMERIC,
    longitude NUMERIC
)