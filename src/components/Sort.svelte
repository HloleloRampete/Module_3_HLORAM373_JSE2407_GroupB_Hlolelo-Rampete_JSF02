<script>
    import { sortProducts } from '../store/productStore.js';
  
    export let products = [];
    export let sortedProducts = [];
    let criteria = 'price-asc'; // Default sorting criteria
  
    // Function to handle sort criteria change
    function handleSortChange(event) {
      criteria = event.target.value;
      sortedProducts = sortProducts(products, criteria);
    }
  
    // Initialize sorted products when the component mounts or products change
    $: sortedProducts = sortProducts(products, criteria);
  </script>
  
  <div>
    <!-- Dropdown to select sorting criteria -->
    <select on:change={handleSortChange} bind:value={criteria} class="p-2 border rounded">
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="rating-asc">Rating: Low to High</option>
      <option value="rating-desc">Rating: High to Low</option>
      <option value="name-asc">Name: A to Z</option>
      <option value="name-desc">Name: Z to A</option>
    </select>
  </div>