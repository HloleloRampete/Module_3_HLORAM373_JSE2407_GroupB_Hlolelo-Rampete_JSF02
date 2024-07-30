import { writable } from 'svelte/store';
import { getCategories, fetchSingleProduct } from '../api/api';

export const filterItem = writable('All categories');
export const searchTerm = writable('');
export const products = writable([]);
export const categories = writable([]);
export const error = writable(null);
export const sortCriteria = writable('price-asc');

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

export function sortProducts(products, criteria) {
    // Sorting logic based on criteria
    const sortedProducts = [...products]; // Create a copy of the products array
  
    switch (criteria) {
      case 'price-asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating-asc':
        sortedProducts.sort((a, b) => a.rating.rate - b.rating.rate);
        break;
      case 'rating-desc':
        sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'name-asc':
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // If no valid criteria is provided, return the products unsorted
        return products;
    }
  
    return sortedProducts;
  }
  
