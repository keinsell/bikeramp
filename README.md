# Bikeramp 🚲

Imagine you are a bike courier and you want to build a system that will help you track your rides during delivery of
packages: how many kilometers did you ride on each day and how much did customer pay for delivery. The app will help you
to control your work.

[![wakatime](https://wakatime.com/badge/user/13a02f4d-34c9-45f7-95ee-bf9d66b139fb/project/6899323b-7034-4787-bf9a-35dae1cbc8f8.svg)](https://wakatime.com/badge/user/13a02f4d-34c9-45f7-95ee-bf9d66b139fb/project/6899323b-7034-4787-bf9a-35dae1cbc8f8)
[![CI](https://github.com/keinsell/bikeramp/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/keinsell/bikeramp/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/keinsell/bikeramp/branch/main/graph/badge.svg?token=GEa0f1dz4o)](https://codecov.io/gh/keinsell/bikeramp)

## Getting Started

The repository has many methods to use it locally, the recommended method is to use docker-compose and set up the entire
environment in containers, although you can also build the application locally on your machine (this is a slower way).

### With `docker-compose`

Docker Compose is the recommended method of using the application, it allows you to build and connect all the required
services for the application to function. Use the following commands to set up `docker-compose.yml` on your local
machine.

```bash
git clone git@github.com:keinsell/bikeramp.git && cd bikeramp
cp example.env .env
docker-compose up -d
docker exec -it bikeramp-server yarn db:push
# Voila! Application is running at http://localhost:1337
```

In case you do not want to pull repository you can pull image from GitHub Package Registry
`ghcr.io/keinsell/bikeramp:latest`, there is still need for executing `docker exec -it bikeramp-server yarn db:push` to
migrate database - here is example of `docker-compose.yml` that you can use.

```yml
version: '3.7'
services:
  server:
    restart: 'on-failure'
    depends_on:
      - postgres
    container_name: bikeramp-server
    image: ghcr.io/keinsell/bikeramp:latest
    ports:
      - '1337:3000'
    environment:
      DATABASE_URL: postgres://root:aamEnrMM9Qq42On1dE8MWwp-9epAyRODgzrOZmWHySHg_2t2Ysp563TlMFfnp55u@postgres:5432/bikeramp
  postgres:
    container_name: bikeramp-postgres
    image: postgres:latest
    ports:
      - '5432:5432'
    environment:
      POSTGRES_USER: root
      POSTGRES_PASSWORD: aamEnrMM9Qq42On1dE8MWwp-9epAyRODgzrOZmWHySHg_2t2Ysp563TlMFfnp55u
      POSTGRES_DATABASE: bikeramp
```

### With `node`

In the case of running the application in a local environment pay attention to the configuration in `.env` and use the
available PostgresSql database, additionally your machine should contain the software listed below:

- `node@v18.12.1`
- `yarn@1.19.2`

```bash
git clone git@github.com:keinsell/bikeramp.git && cd bikeramp
cp example.env .env
yarn install
yarn build
yarn db:push
node dist/main.js
# Voila! Application is running at http://localhost:1337
```

## Documentation

Applicaiton provides build-in OpenAPI 3.0 Documentation available at `baseUrl`, so if your application in running on
`localhost:1337` it should be available by `http://localhost:1337`.

## License, Contributing etc.

I'm too lazy for that, sorry.
