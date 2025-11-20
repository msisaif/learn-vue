<template>
  <div v-if="relatedPosts.length > 0" class="bg-white rounded-lg shadow-md p-6">
    <h3 class="text-xl font-bold text-gray-800 mb-6">Related Posts</h3>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <RouterLink
        v-for="post in relatedPosts"
        :key="post.id"
        :to="`/blog/${post.slug}`"
        class="group"
      >
        <div class="relative h-40 overflow-hidden rounded-lg mb-3 bg-gray-200">
          <img
            :src="post.thumbnail"
            :alt="post.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h4 class="font-semibold text-gray-800 group-hover:text-blue-600 line-clamp-2 text-sm">
          {{ post.title }}
        </h4>
        <p class="text-xs text-gray-500 mt-2">{{ formatDate(post.publishDate) }}</p>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  relatedPosts: {
    type: Array,
    required: true,
  },
})

import { RouterLink } from 'vue-router'

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>
