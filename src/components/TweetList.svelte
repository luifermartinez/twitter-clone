<script lang="ts">
  import Tweet from './Tweet.svelte';
  import TweetDetail from './TweetDetail.svelte';

  export let tweets: Array<{
    id: number;
    content: string;
    likes: number;
    isFavorite: boolean;
    comments: any[];
  }>;

  let selectedTweetId: number | null = null;

  function openTweetDetail(event: CustomEvent<number>) {
    selectedTweetId = event.detail;
  }

  function closeTweetDetail() {
    selectedTweetId = null;
  }
</script>

<div class="space-y-4 p-4">
  {#each tweets as tweet (tweet.id)}
    <Tweet {tweet} on:openDetail={openTweetDetail} />
  {/each}
</div>

{#if selectedTweetId !== null}
  <TweetDetail tweetId={selectedTweetId} on:close={closeTweetDetail} />
{/if}