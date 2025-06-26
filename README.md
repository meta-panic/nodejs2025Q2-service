# Home Library Service

## Prerequisites

This project uses environment variables for configuration. A `.env.example` file is provided in the `configs/` directory. **For Docker Compose setup, you should copy this file to the same folder directory, rename it to `.env`, and update the variables in the `.env` file according to your environment.**

## TL;DR (Quick Start with Docker)

To get the application running quickly with Docker:

1.  `git clone https://github.com/meta-panic/nodejs2025Q2-service.git`
2.  **Navigate to the `nodejs2025Q2-service` directory**: `cd nodejs2025Q2-service`
3.  `git checkout feature/auth-and-logger`
4.  **Navigate to the `configs/` directory**: `cd configs`
5.  **Copy `.env.example` to `.env`** in the `configs/` directory and set your environment variables.
6.  **Build images**: `docker compose -f docker-compose.yml build`
7.  **Start containers**: `docker compose -f docker-compose.yml up`
8.  **Run auth tests(in docker container!!!)**: `npx cross-env TEST_MODE=auth jest --testPathIgnorePatterns refresh.e2e.spec.ts --runInBand --silent=false`
9. **Run refresh token tests(in docker container!!!)**: `npx cross-env TEST_MODE=auth jest refresh.e2e.spec.ts --runInBand --silent=false`

## Downloading

```
git clone https://github.com/meta-panic/nodejs2025Q2-service.git
```

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
    docker compose -f docker-compose.yml up
    ```
4.  **Access the API:**
    Once the services are up, the API will be available on `http://localhost:${PORT}`. You can access the OpenAPI documentation at `http://localhost:${PORT}/doc/`.

5.  **Run tests:**
    Run tests inside docker container!!! If you are using docker desktop it will be exec tab for you.
    
     If you are using cli-docker utils for container management use `docker exec -it <container_name> npm test`.

6.  **Stop the services:**
    To stop and remove the containers, networks, and volumes created by `up -d`:
    ```bash
    docker compose -f docker-compose.yml down
    ```

## Local running

No local development is set-up.


## Testing

After application run inside docker, run tests one by one:

To test auth:

```
npx cross-env TEST_MODE=auth jest --testPathIgnorePatterns refresh.e2e.spec.ts --runInBand --silent=false
```

To test refresh token:

```
npx cross-env TEST_MODE=auth jest refresh.e2e.spec.ts --runInBand --silent=false
```



### Linting

You can only run linter locally as image don't have the packages:

First, install node_modules locally on your machine(not inside docker). Run the command in the root folder:

```
npm install
```

Then run the lint command(on your machine). Linting does not work inside docker container because lint packages take space and we need them only for development.

Run the command to check linting errors: 
```
npm run lint
```
