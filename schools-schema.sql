CREATE TABLE schools (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    sf_district TEXT NOT NULL,
    students TEXT,
    free_reduced_lunch TEXT,
    ell TEXT,
    color TEXT,
    img TEXT,
    latitude NUMERIC,
    longitude NUMERIC
)