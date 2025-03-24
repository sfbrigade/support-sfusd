# Docker Scripts

This area contains scripts for running the website database locally in a Docker container.

## Setup

### Install Docker

Install [Docker Desktop](https://www.docker.com/products/docker-desktop). This **should** provide the `docker` and `docker-compose` commands in your terminal. If `docker-compose` is missing, try `docker compose` instead.

### Environment Variables

Create (or update) a `.env` file in the root of project to instruct `prisma` where to find the database, using the following environment variables:

```bash
# Database
COMPOSE_FILE=docker/docker-compose.yml
DB_PASSWORD=supersecret
DB_USER=postgres
DB_NAME=mydb

POSTGRES_PRISMA_URL="postgresql://postgres:supersecret@localhost:5432/mydb"
POSTGRES_URL_NON_POOLING="postgresql://postgres:supersecret@localhost:5432/mydb"
```

### Launch the Database

Once Docker Desktop is installed and available via the command line, you can run the following command to start the database, using the `-f` flag to specify the location of the `docker-compose.yml` file:

```bash
docker-compose -f docker/docker-compose.yml up -d
```

This command will start a PostgreSQL database in a Docker container. The database will be available at `localhost:5432` with the username `postgres`.

### Create the Database

On first launch Docker will automatically allocate a new volume to persist the database data. On subsequent launches, this volume will be remounted, retaining the data between sessions.

Initially (or if you reset this volume), you'll need to load the database schema and seed data. You can do this by running the following prisma commands:

```bash
npx prisma db push
npx prisma db seed
```

After the database is created and seeded, you can run the website locally to interact with the database.

### Stopping the Database

To stop the database and kill the associated containers, run the following command:

```bash
docker-compose -f docker/docker-compose.yml down
```
