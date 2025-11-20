<template>
  <div v-if="blog" class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
      <div class="max-w-4xl mx-auto px-4">
        <BlogBreadcrumb :title="blog.title" />
        <h1 class="text-4xl font-bold mb-4">{{ blog.title }}</h1>
        <div class="flex items-center gap-4 text-blue-100">
          <img :src="blog.authorAvatar" :alt="blog.author" class="w-10 h-10 rounded-full" />
          <div>
            <p class="font-semibold">{{ blog.author }}</p>
            <p class="text-sm">{{ formatDate(blog.publishDate) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 py-12">
      <!-- Featured Image -->
      <div class="mb-8 rounded-lg overflow-hidden shadow-lg">
        <img :src="blog.thumbnail" :alt="blog.title" class="w-full h-96 object-cover" />
      </div>

      <!-- Meta Info -->
      <div class="flex flex-wrap gap-4 mb-8 pb-8 border-b border-gray-200">
        <div class="flex items-center gap-2 text-gray-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          <span>{{ blog.category }}</span>
        </div>
        <div class="flex items-center gap-2 text-gray-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <span>{{ blog.views }} views</span>
        </div>
      </div>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-8">
        <span
          v-for="tag in blog.tags"
          :key="tag"
          class="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold"
        >
          #{{ tag }}
        </span>
      </div>

      <!-- Content -->
      <div class="prose prose-lg max-w-none mb-12">
        <div v-html="blog.content" class="text-gray-800 leading-relaxed" />
      </div>

      <!-- Share Buttons -->
      <ShareButtons :url="currentUrl" :title="blog.title" />

      <!-- Related Posts -->
      <RelatedPosts :related-posts="relatedPosts" />

      <!-- Comments Section -->
      <div class="mt-12 space-y-8">
        <CommentForm :post-id="blog.id" @comment-added="onCommentAdded" />
        <CommentList :comments="comments" @reply-added="onReplyAdded" />
      </div>
    </div>
  </div>

  <!-- Not Found -->
  <div v-else class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">Post Not Found</h1>
      <p class="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
      <RouterLink
        to="/blog"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
      >
        Back to Blog
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import BlogBreadcrumb from '@/components/blog/Breadcrumb.vue'
import CommentForm from '@/components/blog/CommentForm.vue'
import CommentList from '@/components/blog/CommentList.vue'
import RelatedPosts from '@/components/blog/RelatedPosts.vue'
import ShareButtons from '@/components/blog/ShareButtons.vue'
import { useSeo } from '@/composables/useSeo'
import { useBlogStore } from '@/stores/blogStore'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const blogStore = useBlogStore()

const blog = computed(() => blogStore.getBlogBySlug(route.params.slug))
const relatedPosts = computed(() => blogStore.getRelatedPosts(route.params.slug))
const comments = computed(() => blogStore.getCommentsByPostId(blog.value?.id))
const currentUrl = computed(() => window.location.href)

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const onCommentAdded = () => {
  // Comments are automatically updated from store
}

const onReplyAdded = () => {
  // Replies are automatically updated from store
}

// SEO
const seoMeta = computed(() => ({
  title: blog.value ? `${blog.value.title} - Blog` : 'Blog Post',
  description: blog.value?.excerpt || 'Read our latest blog post',
  keywords: blog.value?.tags.join(', ') || '',
  author: blog.value?.author || '',
  ogTitle: blog.value?.title,
  ogDescription: blog.value?.excerpt,
  ogImage: blog.value?.thumbnail,
  ogUrl: currentUrl.value,
  ogType: 'article',
  twitterCard: 'summary_large_image',
  twitterTitle: blog.value?.title,
  twitterDescription: blog.value?.excerpt,
  twitterImage: blog.value?.thumbnail,
}))

useSeo(seoMeta)
</script>

<style scoped>
.prose {
  color: #374151;
}

.prose :deep(h2) {
  font-size: 1.875rem;
  font-weight: 700;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

.prose :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.25em;
  margin-bottom: 0.5em;
}

.prose :deep(p) {
  margin-bottom: 1em;
  line-height: 1.75;
}

.prose :deep(ul),
.prose :deep(ol) {
  margin-left: 1.5em;
  margin-bottom: 1em;
}

.prose :deep(li) {
  margin-bottom: 0.5em;
}

.prose :deep(a) {
  color: #2563eb;
  text-decoration: underline;
}

.prose :deep(a:hover) {
  color: #1d4ed8;
}

.prose :deep(blockquote) {
  border-left: 4px solid #2563eb;
  padding-left: 1em;
  margin-left: 0;
  margin-bottom: 1em;
  font-style: italic;
  color: #6b7280;
}

.prose :deep(code) {
  background-color: #f3f4f6;
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
  font-family: 'Courier New', monospace;
}

.prose :deep(pre) {
  background-color: #1f2937;
  color: #f3f4f6;
  padding: 1em;
  border-radius: 0.5em;
  overflow-x: auto;
  margin-bottom: 1em;
}

.prose :deep(pre code) {
  background-color: transparent;
  padding: 0;
  color: inherit;
}
</style>
