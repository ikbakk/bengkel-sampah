# Bengkel Sampah

## Description

The purpose of making this project is, to make it easier for Bengkel Sampah to manage waste banks in every village and school, with an integrated system between waste reports, financial reports, customer reel reports and the number of customers. as well as making the Bengkel Sampah service booking system digital either through an application or web that is easy to use.

## Features

1. Admin

   - Dashboard Admin
   - Add waste
   - Add bank sampah
   - Edit waste
   - Edit bank sampah
   - Delete waste
   - Delete bank sampah
   - Delete partner
   - Delete driver
   - Login Admin
   - Register Admin

2. User

   - Dashboard User
   - Sell Waste
   - Add waste to cart
   - Login customer
   - Register Customer

## Technology

- Next.js
- Express
- Prisma
- PostgreSQL

## API Routes

[Postman API Collection](https://drive.google.com/file/d/1MVuvsmGEdctQhzwGNuBI0Y0vHCKEmjyw/view?usp=sharing)

## Other Repo

Because we want to expose the API to the public for Mobile Engineering team to use the API and realized later on that next-auth can only be used for the app only, we have created a separate repository for the authentication.

[Bengkel sampah auth](https://github.com/varomnrg/bengkel-sampah-be)

## Getting Started

### Run Locally

1. Clone the repository

```bash
git clone https://github.com/ikbakk/bengkel-sampah.git
```

2. Install dependencies

```bash
cd bengkel-sampah
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Add the .env file

```bash
env file
```

4. Start the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Run the Container

1. Build docker image

```bash
docker build -t bengkel-sampah-app .
```

2. Run docker image

```bash
docker run -p 3000:3000 bengkel-sampah-app
```
