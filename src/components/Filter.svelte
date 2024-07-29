<script>
    import { onMount } from 'svelte';
    import { filterItem, searchTerm, fetchProducts, searchProducts, categories, fetchCategories, error } from '../store/productStore';
  
    let dropdownVisible = false;
    let categoriesList = [];
    let currentError = null;
  
    // Subscribe to stores
    $: categories.subscribe(value => categoriesList = value);
    $: error.subscribe(value => currentError = value);
    $: filterItem.set('All categories'); // Initialize filterItem
    $: fetchCategories(); // Fetch categories on mount
  
    onMount(() => {
      fetchProducts();
    });
  
    function toggleDropdown() {
      dropdownVisible = !dropdownVisible;
    }
  
    function handleFilter(category) {
      filterItem.set(category);
      dropdownVisible = false;
      fetchProducts();
    }
  
    function handleSearch(event) {
      searchTerm.set(event.target.value);
      searchProducts(event.target.value);
    }
  
    if (currentError) {
      return <Error {currentError} />;
    }
  </script>
  
  <form>
    <div class="flex lg:w-[31.25rem] sm:w-[95%] md:w-full relative">
      <button
        on:click|preventDefault={toggleDropdown}
        id="dropdown-button"
        class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200"
        type="button"
      >
        {$filterItem}
        <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>
      {#if dropdownVisible}
        <div id="dropdown" class="z-10 absolute top-[100%] bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
          <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdown-button">
            <li on:click={() => handleFilter('All categories')} class="inline-flex w-full px-4 py-2 hover:bg-gray-100">All categories</li>
            {#each categoriesList as category}
              <li>
                <button on:click={() => handleFilter(category)} type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100">{category}</button>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
      <div class="relative w-full">
        <input
          type="search"
          id="search-dropdown"
          name="searchInput"
          class="p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search products..."
          bind:value={$searchTerm}
          on:input={handleSearch}
        />
        <button type="submit" class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
          <span class="sr-only">Search</span>
        </button>
      </div>
    </div>
  </form>
  
  