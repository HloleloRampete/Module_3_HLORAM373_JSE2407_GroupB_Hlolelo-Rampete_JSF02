import { writable } from 'svelte/store';
import { getCategories, fetchSingleProduct } from '../api/api';

// Stores for filtering and searching
export const filterItem = writable('All categories');
export const searchTerm = writable('');
export const products = writable([]);
export const categories = writable([]);
export const error = writable(null);

// Function to fetch categories
export async function fetchCategories() {
  const { response, error: fetchError } = await getCategories();
  if (fetchError) {
    error.set(fetchError);
  } else {
    categories.set(response);
  }
}

// Function to fetch all products
export async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error('Data fetching failed, please check your network connection');
    }
    const data = await response.json();
    if ($filterItem !== 'All categories') {
      products.set(data.filter(product => product.category === $filterItem));
    } else {
      products.set(data);
    }
  } catch (fetchError) {
    error.set(fetchError);
  }
}

// Function to search products based on the search term
export async function searchProducts(term) {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error('Data fetching failed, please check your network connection');
    }
    const data = await response.json();
    if (term) {
      products.set(data.filter(product => product.title.toLowerCase().includes(term.toLowerCase())));
    } else {
      products.set(data);
    }
  } catch (fetchError) {
    error.set(fetchError);
  }
}
