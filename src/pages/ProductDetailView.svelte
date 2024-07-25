<!-- src/pages/ProductDetailView.svelte -->
<script>
  import { onMount } from 'svelte';
  import { params } from 'svelte-spa-router';

  let productId;
  $: productId = $params.id;

  onMount(() => {
    // Fetch product detail logic
  });
</script>

<style>
  /* Product detail styles */
</style>

<h1>Product Detail for {productId}</h1>
