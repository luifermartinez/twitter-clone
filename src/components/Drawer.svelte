<script lang="ts">
  export let isOpen = false;

  function closeDrawer() {
    isOpen = false;
  }
</script>

<div class="drawer-overlay" class:hidden={!isOpen} on:click={closeDrawer}></div>
<nav class="drawer" class:open={isOpen}>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Menu</h2>
    <ul class="space-y-2">
      <li><a href="#" class="text-blue-400">Home</a></li>
      <li><a href="#" class="text-blue-400">Profile</a></li>
      <li><a href="#" class="text-blue-400">Settings</a></li>
    </ul>
  </div>
</nav>

<style>
  .drawer {
    position: absolute;
    top: 0;
    left: -100%;
    height: 100%;
    width: 100%;
    max-width: 250px;
    background-color: #1a202c;
    transition: left 0.3s ease-in-out;
    z-index: 50;
  }

  .drawer.open {
    left: 0;
  }

  .drawer-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 40;
  }
</style>