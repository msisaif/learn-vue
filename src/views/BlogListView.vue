<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
      <div class="max-w-6xl mx-auto px-4">
        <h1 class="text-4xl font-bold mb-2">Our Blog</h1>
        <p class="text-blue-100">Insights, tips, and stories about web development</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <BlogFilter />
        </div>

        <!-- Blog Posts -->
        <div class="lg:col-span-3">
          <!-- Empty State -->
          <div v-if="blogStore.paginatedBlogs.length === 0" class="text-center py-12">
            <svg
              class="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">No posts found</h3>
            <p class="text-gray-600 mb-6">Try adjusting your filters or search query</p>
            <button
              @click="blogStore.clearFilters"
              class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>

          <!-- Blog Grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <BlogCard v-for="blog in blogStore.paginatedBlogs" :key="blog.id" :blog="blog" />
          </div>

          <!-- Pagination -->
          <BlogPagination />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BlogCard from '@/components/blog/BlogCard.vue'
import BlogFilter from '@/components/blog/BlogFilter.vue'
import BlogPagination from '@/components/blog/Pagination.vue'
import { useBlogStore } from '@/stores/blogStore'

const blogStore = useBlogStore()
</script>
