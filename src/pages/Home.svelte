<script>
  import Filter from "../components/Filter.svelte";
  import Header from "../components/Header.svelte";
  import ProductList from "../components/Products/ProductList.svelte";
  import Sort from "../components/Sort.svelte";
</script>

<Header />
<div class="container mx-auto px-4">
  <div class="flex flex-col md:flex-row justify-between items-start gap-4 mt-3">
    <Filter />
    <Sort />
  </div>
  <ProductList />
</div>