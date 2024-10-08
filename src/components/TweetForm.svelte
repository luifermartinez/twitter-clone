<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let tweetContent = '';

  function handleSubmit() {
    if (tweetContent.trim()) {
      dispatch('tweet', tweetContent);
      tweetContent = '';
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="mb-4">
  <textarea
    bind:value={tweetContent}
    placeholder="What's happening?"
    class="w-full p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
    rows="3"
  ></textarea>
  <button
    type="submit"
    class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-full float-right hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    disabled={!tweetContent.trim()}
  >
    Tweet
  </button>
</form>