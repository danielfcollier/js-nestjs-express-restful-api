# REST API App

Requirements: Node.js + Nest.js

## Add a New Controller with:

```bash
npx nest g controller <route>
```

## Table of Contents

- [Demo Version](#demo-version)
- [Build and Run](#build-and-run)
- [Run Tests](#run-tests)
- [CI-CD](#ci-cd)
- [Configurations](#configurations)
- [References](#references)

## Demo Version

Run locally with `ngrok`:

```bash
npm start:dev
npm run start:tunnel
```

## Build and Run the App

### Locally:

```bash
npm install
npm start:dev
```

### With Docker:

```bash
docker build -t api-rest .
docker run -m 512m --memory-reservation=256m -p 3000:3000 api-rest
```

## Run Tests

```bash
npm test
npm run test:cov
npm run test:e2e
```

## CI-CD

### GitHub Actions

Tests are configured to run on multiple OS and Node.js versions to make sure the app is compatible across many platforms.

#### Test locally with `act`

```bash
act -j tests
```

### Deployment to Production Branch

If tests are passing, the CI with GitHub Actions pushes the changes to a production branch (`prod`).

## References

### Nest.js documentation:

https://docs.nestjs.com/

### Ngrok

https://ngrok.com

### Base dockerfile created with:

https://github.com/vercel/next.js/tree/canary/examples/with-docker

### Test GitHub Actions Locally

https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-net

https://github.com/nektos/act
