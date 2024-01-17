CREATE TABLE schools (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    district TEXT NOT NULL,
    students TEXT,
    frl TEXT,
    ell TEXT,
    color TEXT,
    img TEXT,
    lat POINT,
    lng POINT
)