# React Marketplace

A React marketplace application. Products are loaded from the DummyJSON API. The project demonstrates routing, data fetching, filtering, search, the Context API, and cart and theme state.

## Features

- Product grid with pagination
- Product search
- Category filtering
- Region and country filtering
- Product details pages
- Shopping cart with quantity controls
- Cart persistence with localStorage
- Light / dark theme with localStorage
- Responsive layout
- Demo protected checkout flow

Demo checkout does not process real payments.

## Technologies

- React
- Vite
- React Router
- TanStack Query
- Axios
- Context API
- CSS Modules
- DummyJSON Products API

## Routes

- `/` — product list
- `/products/:id` — product details
- `/cart` — shopping cart
- any other path — 404 fallback

## Data

Product data comes from DummyJSON. Region and country metadata is generated locally for demonstration purposes.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Live Demo

Live demo: To be added after deployment.
