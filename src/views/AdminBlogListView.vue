<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Blog Management</h1>
            <p class="text-gray-600 mt-1">Manage all your blog posts</p>
          </div>
          <RouterLink
            to="/admin/blog/create"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            + New Post
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <BlogPostTable />
    </div>
  </div>
</template>

<script setup>
import BlogPostTable from '@/components/blog/BlogPostTable.vue'
import { RouterLink } from 'vue-router'
</script>
