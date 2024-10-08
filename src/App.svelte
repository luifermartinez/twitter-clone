<script lang="ts">
  import Header from './components/Header.svelte';
  import TweetList from './components/TweetList.svelte';
  import TweetForm from './components/TweetForm.svelte';
  import BottomMenu from './components/BottomMenu.svelte';
  import SearchScreen from './components/SearchScreen.svelte';
  import Drawer from './components/Drawer.svelte';
  import { tweets } from './stores/tweetStore';

  let currentScreen = 'home';
  let searchQuery = '';
  let isDrawerOpen = false;
  let startX = 0;
  let startY = 0;

  function switchScreen(screen: string) {
    currentScreen = screen;
  }

  function addTweet(event: CustomEvent<string>) {
    const newTweet = {
      id: Date.now(),
      content: event.detail,
      likes: 0,
      isFavorite: false,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
      username: 'New User',
      comments: 0,
    };
    tweets.update(t => [newTweet, ...t]);
  }

  function handleSearch(event: CustomEvent<string>) {
    searchQuery = event.detail;
  }

  function handleStart(event: MouseEvent | TouchEvent) {
    startX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    startY = 'touches' in event ? event.touches[0].clientY : event.clientY;
  }

  function handleEnd(event: MouseEvent | TouchEvent) {
    const endX = 'changedTouches' in event ? event.changedTouches[0].clientX : event.clientX;
    const endY = 'changedTouches' in event ? event.changedTouches[0].clientY : event.clientY;
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    if (deltaX > 50 && Math.abs(deltaY) < 30 && startX < 30) {
      isDrawerOpen = true;
    }
  }

  $: filteredTweets = searchQuery
    ? $tweets.filter(tweet => tweet.content.toLowerCase().includes(searchQuery.toLowerCase()))
    : $tweets;
</script>

<main 
  class="max-w-md mx-auto bg-gray-800 min-h-screen relative overflow-hidden flex flex-col"
  on:mousedown={handleStart}
  on:mouseup={handleEnd}
  on:touchstart={handleStart}
  on:touchend={handleEnd}
>
  <Header />
  
  <Drawer bind:isOpen={isDrawerOpen} />
  
  {#if currentScreen === 'home'}
    <div class="flex-grow overflow-y-auto">
      <div class="p-4">
        <TweetForm on:tweet={addTweet} />
      </div>
      <TweetList tweets={filteredTweets} />
    </div>
  {:else if currentScreen === 'search'}
    <SearchScreen on:search={handleSearch} />
  {/if}
  
  <BottomMenu on:switchScreen={({ detail }) => switchScreen(detail)} />
</main>

<style>
  :global(body) {
    @apply bg-gray-900;
  }
</style>