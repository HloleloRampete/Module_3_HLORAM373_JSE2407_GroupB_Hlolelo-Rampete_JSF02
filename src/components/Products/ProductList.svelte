<script>
  import { onMount } from 'svelte';
  import ProductCard from './ProductCard.svelte';
  import CardSkeleton from './CardSkeleton.svelte';
  import Error from '../Error.svelte';
  import { productStore } from '../../store/productStore';

  let products = [];
  let loading = true;
  let error = null;

  onMount(() => {
    const unsubscribe = productStore.products.subscribe((state) => {
      products = state;
      loading = false;
    });

    productStore.error.subscribe((value) => {
      error = value;
    });

    return () => {
      unsubscribe();
    };
  });

  // You might want to trigger the initial product fetch here
  onMount(() => {
    productStore.fetchProducts();
  });
</script>

{#if loading && !error}
  <div class="grid justify-center">
    <div class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
      {#each Array(20) as _, index}
        <CardSkeleton key={index} />
      {/each}
    </div>
  </div>
{:else if error}
  <div class="grid justify-center">
    <Error {error} />
  </div>
{:else}
  <div class="grid justify-center">
    <div class="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
      {#each products as product (product.id)}
        <ProductCard {...product} />
      {/each}
    </div>
  </div>
{/if}
