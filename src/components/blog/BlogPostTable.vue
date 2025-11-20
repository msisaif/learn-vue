<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <!-- Filters -->
    <div class="p-6 border-b border-gray-200">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search posts..."
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          v-model="statusFilter"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <select
          v-model="categoryFilter"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          <option v-for="cat in blogStore.categories" :key="cat.id" :value="cat.name">
            {{ cat.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-100 border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Author</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Views</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="post in filteredPosts"
            :key="post.id"
            class="border-b border-gray-200 hover:bg-gray-50"
          >
            <td class="px-6 py-4 text-sm text-gray-800 font-medium">{{ post.title }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ post.category }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ post.author }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ formatDate(post.publishDate) }}</td>
            <td class="px-6 py-4 text-sm">
              <span
                :class="[
                  'inline-block px-3 py-1 rounded-full text-xs font-semibold',
                  post.status === 'published'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800',
                ]"
              >
                {{ post.status || 'Draft' }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ post.views }}</td>
            <td class="px-6 py-4 text-sm">
              <div class="flex gap-2">
                <RouterLink
                  :to="`/admin/blog/edit/${post.id}`"
                  class="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Edit
                </RouterLink>
                <button
                  @click="deletePost(post.id)"
                  class="text-red-600 hover:text-red-800 font-semibold"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-if="filteredPosts.length === 0" class="p-8 text-center text-gray-500">
      <p>No posts found</p>
    </div>
  </div>
</template>

<script setup>
import { useBlogStore } from '@/stores/blogStore'
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

const blogStore = useBlogStore()
const searchQuery = ref('')
const statusFilter = ref('')
const categoryFilter = ref('')

const filteredPosts = computed(() => {
  return blogStore.blogs.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !statusFilter.value || (post.status || 'draft') === statusFilter.value
    const matchesCategory = !categoryFilter.value || post.category === categoryFilter.value

    return matchesSearch && matchesStatus && matchesCategory
  })
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const deletePost = (id) => {
  if (confirm('Are you sure you want to delete this post?')) {
    blogStore.deleteBlog(id)
  }
}
</script>
