<script setup lang="ts">
const { $client } = useNuxtApp();
const posts = await $client.post.list.query();
</script>

<template>
  <main class="w-full max-w-4xl mx-auto flex flex-col gap-4 py-16">
    <h1 class="font-bold text-xl">Home</h1>
    <pre class="font-medium p-1 bg-zinc-200 rounded">{{
      JSON.stringify(posts, null, 2)
    }}</pre>
  </main>
</template>
