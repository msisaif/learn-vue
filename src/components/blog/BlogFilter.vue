<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-8">
    <!-- Search Bar -->
    <div class="mb-6">
      <label class="block text-sm font-semibold text-gray-700 mb-2">Search Posts</label>
      <div class="relative">
        <input
          type="text"
          :value="blogStore.searchQuery"
          @input="blogStore.setSearchQuery($event.target.value)"
          placeholder="Search by title, excerpt, or content..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg
          class="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>

    <!-- Category Filter -->
    <div class="mb-6">
      <label class="block text-sm font-semibold text-gray-700 mb-2">Category</label>
      <select
        :value="blogStore.selectedCategory || ''"
        @change="blogStore.setSelectedCategory($event.target.value || null)"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Categories</option>
        <option v-for="category in blogStore.categories" :key="category.id" :value="category.name">
          {{ category.name }}
        </option>
      </select>
    </div>

    <!-- Tag Filter -->
    <div class="mb-6">
      <label class="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tag in blogStore.tags"
          :key="tag.id"
          @click="blogStore.toggleTag(tag.name)"
          :class="[
            'px-3 py-1 rounded-full text-sm font-medium transition-colors',
            blogStore.selectedTags.includes(tag.name)
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
        >
          {{ tag.name }}
        </button>
      </div>
    </div>

    <!-- Active Filters Display -->
    <div v-if="hasActiveFilters" class="mb-6 p-4 bg-blue-50 rounded-lg">
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-700">
          <span class="font-semibold">{{ blogStore.filteredBlogs.length }}</span>
          posts found
        </div>
        <button
          @click="blogStore.clearFilters"
          class="text-sm text-blue-600 hover:text-blue-800 font-semibold"
        >
          Clear Filters
        </button>
      </div>
    </div>

    <!-- Results Info -->
    <div v-else class="text-sm text-gray-600">
      Showing <span class="font-semibold">{{ blogStore.filteredBlogs.length }}</span> posts
    </div>
  </div>
</template>

<script setup>
import { useBlogStore } from '@/stores/blogStore'
import { computed } from 'vue'

const blogStore = useBlogStore()

const hasActiveFilters = computed(() => {
  return blogStore.searchQuery || blogStore.selectedCategory || blogStore.selectedTags.length > 0
})
</script>
