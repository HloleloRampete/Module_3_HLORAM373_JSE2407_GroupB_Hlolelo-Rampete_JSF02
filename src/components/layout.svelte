<!-- src/components/Layout.svelte -->
<script>
    import Header from './Header.svelte';
  </script>
  
  <style>
    /* Add your layout styles here */
  </style>
  
  <div>
    <Header />
    <main>
      <slot></slot>
    </main>
  </div>
  