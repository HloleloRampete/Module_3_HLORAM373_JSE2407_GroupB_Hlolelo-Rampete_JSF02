// src/routes.js
import Home from './pages/Home.svelte';
import ProductDetailView from './pages/ProductDetailView.svelte';
import Login from './pages/Login.svelte';

export const routes = {
  '/': Home,
  '/products/:id': ProductDetailView,
  '/login': Login,
};
