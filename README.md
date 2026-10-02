# React Marketplace

A React marketplace application for browsing products, viewing details, and managing a shopping cart. Products come from the DummyJSON API. The project demonstrates routing, data fetching, filtering, search, the Context API, and cart and theme state.

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

- React — component-based UI
- Vite — local development and production build
- React Router — client-side routing
- TanStack Query — API loading, error, and cache handling
- Axios — API requests
- Context API — shared cart and theme state
- CSS Modules — component-scoped styling
- DummyJSON Products API — product data without a custom backend

## Routes

- `/` — product list
- `/products/:id` — product details
- `/cart` — shopping cart
- any other path — 404 fallback

## Data

Product data comes from DummyJSON. Region and country metadata is generated locally for demonstration purposes.

## Project Structure

- `src/api` — DummyJSON requests
- `src/components` — shared UI, such as the layout, search bar, and product card
- `src/context` — cart and theme state
- `src/pages` — route screens and their page-specific parts
- `src/utils` — local marketplace location helpers

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Future Improvements

The core assignment requirements are complete.

Possible next steps:

- sorting
- product image gallery
- skeleton loading
- debounced search

## Live Demo

Live demo: To be added after deployment.
