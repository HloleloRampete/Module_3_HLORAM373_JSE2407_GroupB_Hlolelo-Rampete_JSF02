<script>
  import Filter from "../components/Filter.svelte";
  import Header from "../components/Header.svelte";
  import ProductList from "../components/Products/ProductList.svelte";
  import Sort from "../components/Sort.svelte";
</script>


<Header />
<div class="grid lg:flex gap-y-4 gap-x-48 lg:items-start  mt-3 mx-auto justify-center">
  <Filter />
  <Sort />
</div>
<ProductList />


