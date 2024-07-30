<script>
  export let sortOrder = "";
  export let onSort;
</script>

<select bind:value={sortOrder} on:change={onSort} class="border p-2 rounded">
  <option value="">Default</option>
  <option value="asc">Lowest to Highest</option>
  <option value="desc">Highest to Lowest</option>
</select>