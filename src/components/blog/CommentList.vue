<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h3 class="text-xl font-bold text-gray-800 mb-6">
      Comments <span class="text-gray-500">({{ comments.length }})</span>
    </h3>

    <div v-if="comments.length === 0" class="text-center py-8 text-gray-500">
      <p>No comments yet. Be the first to comment!</p>
    </div>

    <div v-else class="space-y-6">
      <div v-for="comment in comments" :key="comment.id" class="border-l-4 border-blue-500 pl-4">
        <!-- Comment -->
        <div class="mb-4">
          <div class="flex items-center gap-3 mb-2">
            <img :src="comment.avatar" :alt="comment.author" class="w-10 h-10 rounded-full" />
            <div>
              <p class="font-semibold text-gray-800">{{ comment.author }}</p>
              <p class="text-sm text-gray-500">{{ formatDate(comment.date) }}</p>
            </div>
          </div>
          <p class="text-gray-700">{{ comment.content }}</p>
        </div>

        <!-- Replies -->
        <div
          v-if="comment.replies.length > 0"
          class="ml-4 space-y-4 border-l-2 border-gray-300 pl-4"
        >
          <div v-for="reply in comment.replies" :key="reply.id">
            <div class="flex items-center gap-3 mb-2">
              <img :src="reply.avatar" :alt="reply.author" class="w-8 h-8 rounded-full" />
              <div>
                <p class="font-semibold text-gray-800 text-sm">{{ reply.author }}</p>
                <p class="text-xs text-gray-500">{{ formatDate(reply.date) }}</p>
              </div>
            </div>
            <p class="text-gray-700 text-sm">{{ reply.content }}</p>
          </div>
        </div>

        <!-- Reply Form Toggle -->
        <button
          @click="toggleReplyForm(comment.id)"
          class="mt-3 text-sm text-blue-600 hover:text-blue-800 font-semibold"
        >
          {{ activeReplyId === comment.id ? '✕ Cancel' : '↳ Reply' }}
        </button>

        <!-- Reply Form -->
        <div v-if="activeReplyId === comment.id" class="mt-4 p-4 bg-gray-50 rounded-lg">
          <form @submit.prevent="submitReply(comment.id)" class="space-y-3">
            <input
              v-model="replyForm.author"
              type="text"
              placeholder="Your name"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <input
              v-model="replyForm.email"
              type="email"
              placeholder="your@email.com"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <textarea
              v-model="replyForm.content"
              placeholder="Write a reply..."
              rows="3"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              type="submit"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Post Reply
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBlogStore } from '@/stores/blogStore'
import { ref } from 'vue'

defineProps({
  comments: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['reply-added'])

const blogStore = useBlogStore()
const activeReplyId = ref(null)
const replyForm = ref({
  author: '',
  email: '',
  content: '',
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const toggleReplyForm = (commentId) => {
  activeReplyId.value = activeReplyId.value === commentId ? null : commentId
  replyForm.value = { author: '', email: '', content: '' }
}

const submitReply = async (commentId) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300))

  const newReply = blogStore.addReply(commentId, {
    author: replyForm.value.author,
    email: replyForm.value.email,
    content: replyForm.value.content,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${replyForm.value.author}`,
  })

  emit('reply-added', newReply)

  replyForm.value = { author: '', email: '', content: '' }
  activeReplyId.value = null
}
</script>
