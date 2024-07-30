<script>
    export let rate;
    export let count;
  
    const yellowStars = Math.round(rate);
    const blankStars = 5 - yellowStars;
  </script>
  
  <div class="flex items-left -ml-2 mb-2">
    {#each Array(yellowStars) as _, index}
      <svg
        key={index}
        class="w-4 h-4 text-yellow-300 ms-1"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path
          d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
        />
      </svg>
    {/each}
    {#each Array(blankStars) as _, index}
      <svg
        key={index}
        class="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path
          d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
        />
      </svg>
    {/each}
  </div>
  
  <style>
    .w-4 {
      width: 1rem;
    }
    .h-4 {
      height: 1rem;
    }
    .text-yellow-300 {
      color: #f6e05e;
    }
    .text-gray-300 {
      color: #d1d5db;
    }
    .ms-1 {
      margin-left: 0.25rem;
    }
    .-ml-2 {
      margin-left: -0.5rem;
    }
    .mb-2 {
      margin-bottom: 0.5rem;
    }
    .flex {
      display: flex;
    }
    .items-left {
      align-items: flex-start;
    }
    .dark .text-gray-500 {
      color: #6b7280;
    }
  </style>
  