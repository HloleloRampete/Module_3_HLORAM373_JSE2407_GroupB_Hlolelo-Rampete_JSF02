import { writable } from 'svelte/store';

// Initial products data (you might fetch this from an API in a real application)
const initialProducts = [
  { id: 1, name: 'Product A', price: 30 },
  { id: 2, name: 'Product B', price: 20 },
  { id: 3, name: 'Product C', price: 50 },
];

// Writable store for the sorting criteria
export const sorting = writable('default');

// Writable store for the products
export const products = writable(initialProducts);

// Function to sort products based on the current sorting criteria
export function sortProducts() {
  sorting.subscribe((sortOrder) => {
    products.update((items) => {
      let sortedItems = [...items];
      if (sortOrder === 'low') {
        sortedItems.sort((a, b) => a.price - b.price);
      } else if (sortOrder === 'high') {
        sortedItems.sort((a, b) => b.price - a.price);
      }
      return sortedItems;
    });
  });
}
