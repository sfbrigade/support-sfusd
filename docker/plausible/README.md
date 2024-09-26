# Docker Compose for Plausible and Umami

This section contains scripts for running both [Plausible](https://plausible.io) and [Umami](https://umami.is), along with their associated databases locally in Docker containers. Both services are independent and can be run separately or together. Comment out any unneeded services in the [docker-compose.yml](./docker-compose.yml) file.

## Setup

Before getting started with Plausible and/or Umami, please review the [Docker README](../README.md) for instructions on configuring and running the website database using Docker. This guide is specific to running Plausible and Umami services and assumes the website database is already configured and created.

After setting up the environment to run the website database, Plausible and Umami require some configuration. Refer to the [Plausible documentation](https://plausible.io/docs/plausible-script) and the [Umami documentation](https://umami.is/docs/login) to get started. Both Plausible and Umami need to load JavaScript into the browser to collect data. This requires an adjustment to the `<Head>` section of [_document.tsx](/src/pages/_document.tsx).

For example, for Plausible, you will likely need to add the following `<script>` tag (replacing the production `<script>` tag with this localhost URL):

```html
<script defer data-domain="localhost" src="http://localhost:8000/js/script.local.js"></script>
```

> **Important**: Be sure to **replace** the existing Plausible `<script>` tag with this localhost version. You do not want development data going to the production Plausible server.

Below is a typical Umami script import. The `data-website-id` is something you get from the Umami admin dashboard when setting up a new website.

```html
<script defer src="http://localhost:3001/script.js" data-website-id="925050a6-50a7-4fce-8627-b3031c404869"></script>
```

## Running

After configuration, you can launch these services using [docker-compose](https://docs.docker.com/compose/):

```bash
docker-compose up -d
```

To stop the services, run:

```bash
docker-compose down
```

> **Note**: The compose file launches a local PostgreSQL database for the website, but it does not launch a container for the Next.js server. It is assumed that Next.js is running locally on **your** machine. See the [Docker README](../README.md) for more information on running the **database** in Docker.
