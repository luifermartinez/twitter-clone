<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import TweetList from './TweetList.svelte';
  import { tweets } from '../stores/tweetStore';

  const dispatch = createEventDispatcher();
  let searchTerm = '';

  function handleInput() {
    dispatch('search', searchTerm);
  }

  $: filteredTweets = searchTerm
    ? $tweets.filter(tweet => tweet.content.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];
</script>

<div class="p-4 flex-grow overflow-y-auto">
  <div class="mb-4">
    <input
      type="text"
      bind:value={searchTerm}
      on:input={handleInput}
      placeholder="Search tweets..."
      class="w-full p-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  {#if searchTerm}
    <TweetList tweets={filteredTweets} />
  {:else}
    <p class="text-gray-400 text-center mt-8">Enter a search term to find tweets</p>
  {/if}
</div>