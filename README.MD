# what-to-do-in-paris-backend

## Project setup

### Environment variables

The following environment variables are required to run the project:

| Variable name       | Description                                                                |
|---------------------|----------------------------------------------------------------------------|
| `PORT`              | Port on which the server will run                                          |
| `POSTGRES_PASSWORD` | Password for the root user of the PostgreSQL database                      |
| `DATABASE_URL`      | URL of the PostgreSQL database, for Prisma. Required when not using Docker |
| `JWT_SECRET`        | Secret used to sign the JWT tokens                                         |

You can either export them in your shell, or create a `.env` file at the root of the project.

### Install dependencies

```bash
pnpm install
```

### Run the server

#### With Docker

```bash
docker compose up --build -d
```

#### Without Docker

```bash
pnpm run build
```

```bash
pnpm run start
```

### Routes

| Method | Route                                                                    | Description            | Body                                                                                                                                                                                                   |
|--------|--------------------------------------------------------------------------|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `POST` | `/v1/auth/register`                                                      | Register a new user    | `email`, `password`, `name`                                                                                                                                                                            |
| `POST` | `/v1/auth/login`                                                         | Login a user           | `email`, `password`                                                                                                                                                                                    |
| `POST` | `/v1/events`                                                             | Create new events      | `Array<Event>` (see `data.json` in `/script`)                                                                                                                                                          |
| `GET`  | `/v1/events?limit=&page=&from=&to=&deaf=&pmr=&blind=&sortBy=&sortOrder=` | Get all events         | limit: `number`, page: `number`, from: `timestamp`, to `timestamp`, tags: `strings separated by ,`, pmr: `0 or 1`, deaf: `0 or 1`, blind: `0 or 1`, sortOrder: `asc or desc`, sortBy: `field of Event` |
| `GET`  | `/v1/events/:id`                                                         | Get an event by its id |                                                                                                                                                                                                        |

### Other information

A default admin user is created when the server starts for the first time. Its password is displayed in the logs of the
backend.
