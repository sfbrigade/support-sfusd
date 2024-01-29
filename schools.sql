-- run "psql -f schools.sql" in your terminal to drop/add schools db

\echo 'Delete and recreate schools db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE schools;
CREATE DATABASE schools;
\connect schools

\i schools-schema.sql
\i schools-seed.sql

\echo 'Delete and recreate schools_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE schools_test;
CREATE DATABASE schools_test;
\connect schools_test

\i schools-schema.sql