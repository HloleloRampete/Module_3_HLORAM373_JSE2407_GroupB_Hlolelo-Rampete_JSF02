<script>
  import { Router, Route } from 'svelte-routing';
  import Home from './pages/Home.svelte';
  import ProductDetails from './pages/ProductDetailView.svelte';
  import './app.css'
</script>

<Router>
  <Route path="/" component={Home} />
  <Route path="product/:id" component={ProductDetails} />
</Router>