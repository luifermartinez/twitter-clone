<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { tweets } from '../stores/tweetStore';

  export let tweet: {
    id: number;
    content: string;
    likes: number;
    isFavorite: boolean;
    avatar: string;
    username: string;
    comments: any[];
  };

  const dispatch = createEventDispatcher();

  function toggleLike() {
    tweets.update(t =>
      t.map(tw =>
        tw.id === tweet.id ? { ...tw, likes: tw.likes + (tw.likes > 0 ? -1 : 1) } : tw
      )
    );
  }

  function toggleFavorite() {
    tweets.update(t =>
      t.map(tw =>
        tw.id === tweet.id ? { ...tw, isFavorite: !tw.isFavorite } : tw
      )
    );
  }

  function openTweetDetail() {
    dispatch('openDetail', tweet.id);
  }
</script>

<div class="bg-gray-700 p-4 rounded-lg shadow" on:click={openTweetDetail}>
  <div class="flex items-start mb-3">
    <img src={tweet.avatar} alt={tweet.username} class="w-12 h-12 rounded-full mr-3" />
    <div>
      <p class="font-bold">{tweet.username}</p>
      <p class="text-gray-400">@{tweet.username.toLowerCase().replace(' ', '')}</p>
    </div>
  </div>
  <p class="mb-3">{tweet.content}</p>
  <div class="flex justify-between text-gray-400">
    <button class="flex items-center space-x-1">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      <span>{tweet.comments ? tweet.comments.length : 0}</span>
    </button>
    <button on:click|stopPropagation={toggleLike} class="flex items-center space-x-1">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill={tweet.likes > 0 ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <span>{tweet.likes}</span>
    </button>
    <button on:click|stopPropagation={toggleFavorite} class="flex items-center space-x-1">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill={tweet.isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
      <span>{tweet.isFavorite ? 'Saved' : 'Save'}</span>
    </button>
  </div>
</div>