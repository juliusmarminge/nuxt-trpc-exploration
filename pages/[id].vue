<script setup lang="ts">
/**
 * The `id` prop comes from the file name being wrapped in [].
 * @see https://nuxt.com/docs/getting-started/routing
 */
const route = useRoute();
const id = Number(route.params.id);

/**
 * `meetings` is fully typesafe inferred all the way from the database schema.
 */
const { $client } = useNuxtApp();
const meetings = await $client.post.byId.query({ id });
</script>

<template>
  <main class="w-full max-w-4xl mx-auto flex flex-col gap-4 py-16">
    <h1 class="font-bold text-xl">Post {{ id }}</h1>
    <pre class="font-medium p-1 bg-zinc-200 rounded">{{
      JSON.stringify(meetings, null, 2)
    }}</pre>
  </main>
</template>
