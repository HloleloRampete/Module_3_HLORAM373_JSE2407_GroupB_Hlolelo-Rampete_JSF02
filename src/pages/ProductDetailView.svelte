<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';

  /** @type {string} */
  export let id;

  /** @type {boolean} */
  let loading = true;

  /** @type {object|null} */
  let product = null;

  /**
   * Fetches product details from the API and sets the product state.
   * @returns {Promise<void>}
   */
  async function fetchProductDetails() {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    product = data;
  }

  /**
   * Navigates back to the home page.
   */
  function goBack() {
    window.history.back();
  }

  // Fetch product details on component mount
  onMount(async () => {
    await fetchProductDetails();
    loading = false;
  });
</script>

<div class="container mx-auto p-6">
  {#if loading}
    <div class="loading text-center text-2xl">Loading...</div>
  {:else if product}
    <button on:click={goBack} class="bg-gray-500 text-white px-4 py-2 rounded mb-4">Go Back</button>
    <div class="flex flex-col items-center">
      <h3 class="text-lg font-bold mb-2">{product.title}</h3>
      <div class="flex justify-center mb-4">
        <img src={product.image} alt={product.title} class="h-48 object-cover" />
      </div>
      <p class="text-gray-700 mb-2">${product.price}</p>
      <p class="text-gray-500 mb-2">{product.description}</p>
      <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
        {product.category}
      </span>
      <div class="text-gray-700 mt-2 flex items-center">
        {#each Array(5).fill(0) as _, i}
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" class="w-4 h-4 {i < product.rating.rate ? 'text-yellow-500' : 'text-gray-300'}">
            <path d="M10 15.273l-5.227 2.75 1.002-5.79-4.2-4.1 5.872-.852L10 1.273l2.554 5.217 5.872.852-4.2 4.1 1.002 5.79L10 15.273z" />
          </svg>
        {/each}
        <span class="ml-2 text-sm">({product.rating.count})</span>
      </div>
    </div>
  {/if}
</div>