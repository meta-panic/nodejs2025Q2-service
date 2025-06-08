# Home Library Service

## Downloading

```
git clone https://github.com/meta-panic/nodejs2025Q2-service.git
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

## Running with Docker

To run the application using Docker Compose, navigate to the `configs` directory and use the provided `docker-compose.yml` file. Ensure your `.env` file (containing environment variables like `DATABASE_URL`, `PORT`, etc.) is also present in the `configs` directory.

1.  **Navigate to the `configs` directory:**
    ```bash
    cd configs
    ```

2.  **Build the Docker images:**
    This command compiles your application and sets up the necessary layers for your services.
    ```bash
    docker compose -f docker-compose.yml build
    ```

3.  **Start the services:**
    This command will start the `backend` and `db` services, apply Prisma migrations, run the seed script, and then launch your application.
    ```bash
    docker compose -f docker-compose.yml up -d
    ```
4.  **Access the API:**
    Once the services are up, the API will be available on `http://localhost:4000`. You can access the OpenAPI documentation at `http://localhost:4000/doc/`.

5.  **Stop the services:**
    To stop and remove the containers, networks, and volumes created by `up -d`:
    ```bash
    docker compose -f docker-compose.yml down
    ```

## Testing

After application running open new terminal and run tests one by one:

```
npm test -- test/users.e2e.spec.ts
```

```
npm test -- test/artists.e2e.spec.ts
```

```
npm test -- test/albums.e2e.spec.ts
```

```
npm test -- test/favorites.e2e.spec.ts
```

```
npm test -- test/tracks.e2e.spec.ts
```


### Auto-fix and format

```
npm run lint
```

```
npm run format
```
