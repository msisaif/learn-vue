<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
  >
    <!-- Thumbnail -->
    <div class="relative h-48 overflow-hidden bg-gray-200">
      <img
        :src="blog.thumbnail"
        :alt="blog.title"
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
      <div class="absolute top-3 right-3">
        <span
          class="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
        >
          {{ blog.category }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5">
      <!-- Title -->
      <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600">
        <RouterLink :to="`/blog/${blog.slug}`">
          {{ blog.title }}
        </RouterLink>
      </h3>

      <!-- Excerpt -->
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">
        {{ blog.excerpt }}
      </p>

      <!-- Meta Info -->
      <div class="flex items-center justify-between text-xs text-gray-500 mb-4">
        <div class="flex items-center gap-2">
          <img :src="blog.authorAvatar" :alt="blog.author" class="w-6 h-6 rounded-full" />
          <span>{{ blog.author }}</span>
        </div>
        <span>{{ formatDate(blog.publishDate) }}</span>
      </div>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tag in blog.tags.slice(0, 2)"
          :key="tag"
          class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
        >
          #{{ tag }}
        </span>
        <span v-if="blog.tags.length > 2" class="inline-block text-gray-500 text-xs px-2 py-1">
          +{{ blog.tags.length - 2 }}
        </span>
      </div>

      <!-- Stats -->
      <div class="flex items-center justify-between pt-4 border-t border-gray-200">
        <div class="flex gap-4 text-sm text-gray-600">
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            {{ blog.views }}
          </span>
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            {{ blog.comments }}
          </span>
        </div>
        <RouterLink
          :to="`/blog/${blog.slug}`"
          class="text-blue-600 hover:text-blue-800 font-semibold text-sm"
        >
          Read More →
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  blog: {
    type: Object,
    required: true,
  },
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>
