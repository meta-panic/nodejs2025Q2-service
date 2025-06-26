# Home Library Service

## Prerequisites

Before running the application, ensure you have Node.js (22.x.x since 22.14.0) installed.

This project uses environment variables for configuration. A `.env.example` file is provided in the root directory. Copy this file and rename it to `.env`. Update the variables in the `.env` file according to your environment if necessary.

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
