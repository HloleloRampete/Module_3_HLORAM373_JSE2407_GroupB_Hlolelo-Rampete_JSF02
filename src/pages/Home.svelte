<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';

  /** 
   * @typedef {Object} Product
   * @property {number} id
   * @property {string} title
   * @property {string} category
   * @property {string} image
   * @property {number} price
   * @property {Object} rating
   * @property {number} rating.rate
   * @property {number} rating.count
   */

  /**
   * @typedef {Object} Category
   * @property {string} name
   */

  /** @type {boolean} */
  let loading = false;

  /** @type {Product[]} */
  let products = [];

  /** @type {Category[]} */
  let categories = [];

  /** @type {string} */
  let selectedCategory = "";

  /** @type {string} */
  let searchQuery = "";

  /** @type {string} */
  let sortOrder = "";

  /** @type {Product[]} */
  let filteredProducts = [];

  /** @type {boolean} */
  let open = false;

  /**
   * Fetch products and categories on component mount.
   */
  onMount(async () => {
    loading = true;
    await fetchProducts();
    await fetchCategories();
    loading = false;
  });

  /**
   * Fetch all products from the API.
   * @async
   */
  async function fetchProducts() {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    products = data;
    filteredProducts = data;
  }

  /**
   * Fetch all product categories from the API.
   * @async
   */
  async function fetchCategories() {
    const response = await fetch("https://fakestoreapi.com/products/categories");
    const data = await response.json();
    categories = data;
  }

  /**
   * Filter and sort products based on search query, category, and sort order.
   */
  function searchProducts() {
    const searchQueryLower = searchQuery.toLowerCase();
    const categoryFilter = selectedCategory.toLowerCase();

    filteredProducts = products.filter(product => {
      const matchesSearchQuery = product.title.toLowerCase().includes(searchQueryLower);
      const matchesCategory = !categoryFilter || product.category.toLowerCase() === categoryFilter;
      return matchesSearchQuery && matchesCategory;
    });

    if (sortOrder === "asc") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }
  }

  /**
   * Reset all filters and sorting options.
   */
  function resetFilters() {
    selectedCategory = "";
    searchQuery = "";
    sortOrder = "";
    filteredProducts = products;
  }

  /**
   * Navigate to the product details page for the specified product.
   * @param {number} id - The ID of the product.
   */
  function viewProductDetails(id) {
    navigate(`/product/${id}`);
  }
</script>

<body class="bg-blue-200 min-h-screen">
  <!-- Navigation Bar -->
  <header class="sticky z-50 top-0">
    <nav class="bg-gray-500 border-gray-200">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/">
          <button class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="./assets/online-shop.png" class="h-8" alt="SwiftCart Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">SwiftCart</span>
          </button>
        </a>
        <button on:click={() => open = !open}
                class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-controls="navbar-default"
                aria-expanded={open ? "true" : "false"}>
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div class:hidden={!open} class="w-full md:block md:w-auto" id="navbar-default">
          <ul class="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li><a href="/wishlist" class="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Wishlist</a></li>
            <li class="hidden lg:block md:block relative">
              <div class="t-0 absolute left-3 -top-4">
                <p class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">2</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="file: h-6 w-6 stroke-white cursor-pointer">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </li>
            <li class="block md:hidden"><a href="/cart" class="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Cart</a></li>
            <li><a href="/login" class="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Login</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <!-- Main Content -->
  <div class="container mx-auto p-6">
    <div class="flex justify-center mb-4">
      <div class="flex space-x-4">
        <select bind:value={selectedCategory} on:change={searchProducts} class="border p-2 rounded">
          <option value="">All Categories</option>
          {#each categories as category}
            <option value={category}>{category}</option>
          {/each}
        </select>

        <div class="flex items-center">
          <input type="text" bind:value={searchQuery} placeholder="Search products..." class="border p-2 rounded-l" />
          <button on:click={searchProducts} class="bg-white text-black border border-l-0 p-2 rounded-r">Search</button>
        </div>

        <select bind:value={sortOrder} on:change={searchProducts} class="border p-2 rounded">
          <option value="">Default</option>
          <option value="asc">Lowest to Highest</option>
          <option value="desc">Highest to Lowest</option>
        </select>

        <button on:click={resetFilters} class="bg-gray-500 text-white px-4 py-2 rounded">Reset</button>
      </div>
    </div>

    {#if loading}
      <div class="loading text-center text-2xl">Loading...</div>
    {/if}

    {#if !loading}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredProducts as product (product.id)}
          <button class="card bg-white border p-4 rounded shadow hover:shadow-lg transition-shadow duration-300 flex flex-col items-center"
                  on:click={() => viewProductDetails(product.id)}
                  tabindex="0">
            <div class="flex-grow flex items-center justify-center mb-4">
              <img src={product.image} alt={product.title} class="h-48 w-auto" />
            </div>
            <div class="text-center">
              <h2 class="text-lg font-bold mb-2">{product.title}</h2>
              <p class="text-gray-500 mb-2">{product.category}</p>
              <p class="text-lg font-semibold text-green-600 mb-4">${product.price}</p>
            </div>
            <div class="flex items-center">
              {#each Array(Math.round(product.rating.rate)) as _}
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-4 w-4 text-yellow-500" viewBox="0 0 20 20">
                  <path d="M10 15.273l-5.228 2.747 1.002-5.79-4.2-4.1 5.872-.852L10 1.273l2.554 5.217 5.872.852-4.2 4.1 1.002 5.79L10 15.273z" />
                </svg>
              {/each}
              <span class="ml-2 text-sm">({product.rating.count})</span>
            </div>
          </button>
        {/each}
      </div>
    {/if}
  </div>
</body>
