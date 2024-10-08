<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { tweets } from '../stores/tweetStore';

  export let tweetId: number;

  const dispatch = createEventDispatcher();

  let commentContent = '';

  $: tweet = $tweets.find(t => t.id === tweetId);

  function addComment() {
    if (commentContent.trim()) {
      tweets.update(ts => 
        ts.map(t => 
          t.id === tweetId 
            ? { 
                ...t, 
                comments: [
                  { id: Date.now(), content: commentContent, username: 'Current User' },
                  ...(t.comments || [])
                ]
              }
            : t
        )
      );
      commentContent = '';
    }
  }

  function goBack() {
    dispatch('close');
  }
</script>

<div class="fixed inset-0 bg-gray-900 z-50 flex flex-col">
  <header class="bg-gray-800 p-4 flex items-center">
    <button on:click={goBack} class="text-blue-400 mr-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </button>
    <h2 class="text-xl font-bold">Tweet</h2>
  </header>

  <div class="flex-grow overflow-y-auto">
    {#if tweet}
      <div class="p-4">
        <div class="bg-gray-800 rounded-lg shadow mb-4">
          <div class="p-4">
            <div class="flex items-start mb-3">
              <img src={tweet.avatar} alt={tweet.username} class="w-12 h-12 rounded-full mr-3" />
              <div>
                <p class="font-bold">{tweet.username}</p>
                <p class="text-gray-400">@{tweet.username.toLowerCase().replace(' ', '')}</p>
              </div>
            </div>
            <p class="mb-3 text-lg">{tweet.content}</p>
            <div class="flex justify-between text-gray-400 text-sm">
              <span>{tweet.comments ? tweet.comments.length : 0} Comments</span>
              <span>{tweet.likes} Likes</span>
            </div>
          </div>
        </div>

        <div class="space-y-4 mt-4">
          {#if tweet.comments && tweet.comments.length > 0}
            {#each tweet.comments as comment}
              <div class="bg-gray-800 p-4 rounded-lg">
                <p class="font-bold mb-1">{comment.username}</p>
                <p>{comment.content}</p>
              </div>
            {/each}
          {:else}
            <p class="text-gray-400 text-center">No comments yet</p>
          {/if}
        </div>
      </div>
    {/if}
  </div>

  <div class="bg-gray-800 p-4">
    <textarea
      bind:value={commentContent}
      placeholder="Add a comment..."
      class="w-full p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows="3"
    ></textarea>
    <button
      on:click={addComment}
      class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-full float-right hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      disabled={!commentContent.trim()}
    >
      Comment
    </button>
  </div>
</div>