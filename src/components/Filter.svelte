<script>
  export let categories = [];
  export let selectedCategory = "";
  export let searchQuery = "";
  export let onSearch;
  export let onReset;
</script>

<div class="flex space-x-4">
  <select bind:value={selectedCategory} on:change={onSearch} class="border p-2 rounded">
    <option value="">All Categories</option>
    {#each categories as category}
      <option value={category}>{category}</option>
    {/each}
  </select>

  <div class="flex items-center">
    <input type="text" bind:value={searchQuery} placeholder="Search products..." class="border p-2 rounded-l" />
    <button on:click={onSearch} class="bg-white text-black border border-l-0 p-2 rounded-r">Search</button>
  </div>

  <button on:click={onReset} class="bg-gray-500 text-white px-4 py-2 rounded">Reset</button>
</div>