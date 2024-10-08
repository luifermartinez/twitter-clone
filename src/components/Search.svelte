<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let searchTerm = '';

  function handleInput() {
    dispatch('search', searchTerm);
  }
</script>

<div class="mb-4">
  <input
    type="text"
    bind:value={searchTerm}
    on:input={handleInput}
    placeholder="Search tweets..."
    class="w-full p-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>