<script>
  import { sortProducts, products } from '../store/productStore.js';

  let criteria = 'price-asc'; // Default sorting criteria

  // Function to handle sort criteria change
  function handleSortChange(event) {
    criteria = event.target.value;
    sortProducts(criteria);
  }
</script>

<div>
  <select on:change={handleSortChange} bind:value={criteria} class="p-2 border rounded">
    <option value="price-asc">Price: Low to High</option>
    <option value="price-desc">Price: High to Low</option>
    <option value="rating-asc">Rating: Low to High</option>
    <option value="rating-desc">Rating: High to Low</option>
    <option value="name-asc">Name: A to Z</option>
    <option value="name-desc">Name: Z to A</option>
  </select>
</div>