<template>
  <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-8">
    <!-- BlogPagination -->
    <!-- Previous Button -->
    <button
      @click="blogStore.setCurrentPage(blogStore.currentPage - 1)"
      :disabled="blogStore.currentPage === 1"
      class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      ← Previous
    </button>

    <!-- Page Numbers -->
    <div class="flex gap-1">
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="blogStore.setCurrentPage(page)"
        :class="[
          'px-3 py-2 rounded-lg font-medium transition-colors',
          page === blogStore.currentPage
            ? 'bg-blue-500 text-white'
            : 'border border-gray-300 hover:bg-gray-100',
        ]"
      >
        {{ page }}
      </button>
    </div>

    <!-- Next Button -->
    <button
      @click="blogStore.setCurrentPage(blogStore.currentPage + 1)"
      :disabled="blogStore.currentPage === totalPages"
      class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      Next →
    </button>

    <!-- Page Info -->
    <div class="ml-4 text-sm text-gray-600">
      Page <span class="font-semibold">{{ blogStore.currentPage }}</span> of
      <span class="font-semibold">{{ totalPages }}</span>
    </div>
  </div>
</template>

<script setup>
import { useBlogStore } from '@/stores/blogStore'
import { computed } from 'vue'

const blogStore = useBlogStore()

const totalPages = computed(() => blogStore.totalPages)

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, blogStore.currentPage - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})
</script>
