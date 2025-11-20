<template>
  <div v-if="blog" class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-4xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Edit Post</h1>
            <p class="text-gray-600 mt-1">{{ blog.title }}</p>
          </div>
          <RouterLink to="/admin/blog" class="text-gray-600 hover:text-gray-900 font-semibold">
            ← Back
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-4xl mx-auto px-4 py-8">
      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Title -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <label class="block text-sm font-semibold text-gray-700 mb-2">Title</label>
          <input
            v-model="form.title"
            type="text"
            placeholder="Enter post title"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p class="text-gray-500 text-sm mt-1">Slug: {{ blog.slug }}</p>
        </div>

        <!-- Excerpt -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <label class="block text-sm font-semibold text-gray-700 mb-2">Excerpt</label>
          <textarea
            v-model="form.excerpt"
            placeholder="Brief summary of your post"
            rows="3"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Thumbnail -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <ThumbnailUpload v-model="form.thumbnail" />
        </div>

        <!-- Content -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <RichTextEditor v-model="form.content" label="Content" />
        </div>

        <!-- Category & Tags -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              v-model="form.category"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              <option v-for="cat in blogStore.categories" :key="cat.id" :value="cat.name">
                {{ cat.name }}
              </option>
            </select>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="tag in blogStore.tags"
                :key="tag.id"
                @click.prevent="toggleTag(tag.name)"
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium transition-colors',
                  form.tags.includes(tag.name)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                ]"
              >
                {{ tag.name }}
              </button>
            </div>
          </div>
        </div>

        <!-- Author Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Author Name</label>
            <input
              v-model="form.author"
              type="text"
              placeholder="Your name"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select
              v-model="form.status"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <!-- Submit Buttons -->
        <div class="flex gap-4 justify-end">
          <RouterLink
            to="/admin/blog"
            class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 font-semibold transition-colors"
          >
            Cancel
          </RouterLink>
          <button
            type="submit"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Update Post
          </button>
        </div>
      </form>

      <!-- Success Message -->
      <div
        v-if="showSuccess"
        class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
      >
        Post updated successfully!
      </div>
    </div>
  </div>

  <!-- Not Found -->
  <div v-else class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">Post Not Found</h1>
      <p class="text-gray-600 mb-8">The blog post you're trying to edit doesn't exist.</p>
      <RouterLink
        to="/admin/blog"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
      >
        Back to Blog
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import RichTextEditor from '@/components/blog/RichTextEditor.vue'
import ThumbnailUpload from '@/components/blog/ThumbnailUpload.vue'
import { useBlogStore } from '@/stores/blogStore'
import { computed, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()
const showSuccess = ref(false)

const blog = computed(() => blogStore.blogs.find((b) => b.id === parseInt(route.params.id)))

const form = ref({
  title: blog.value?.title || '',
  excerpt: blog.value?.excerpt || '',
  content: blog.value?.content || '',
  thumbnail: blog.value?.thumbnail || '',
  category: blog.value?.category || '',
  tags: blog.value?.tags || [],
  author: blog.value?.author || '',
  status: blog.value?.status || 'draft',
})

const toggleTag = (tag) => {
  const index = form.value.tags.indexOf(tag)
  if (index > -1) {
    form.value.tags.splice(index, 1)
  } else {
    form.value.tags.push(tag)
  }
}

const submitForm = () => {
  blogStore.updateBlog(blog.value.id, {
    title: form.value.title,
    excerpt: form.value.excerpt,
    content: form.value.content,
    thumbnail: form.value.thumbnail,
    category: form.value.category,
    tags: form.value.tags,
    author: form.value.author,
    status: form.value.status,
  })

  showSuccess.value = true
  setTimeout(() => {
    router.push('/admin/blog')
  }, 1500)
}
</script>
