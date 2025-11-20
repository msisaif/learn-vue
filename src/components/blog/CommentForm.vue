<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-8">
    <h3 class="text-xl font-bold text-gray-800 mb-6">Leave a Comment</h3>

    <form @submit.prevent="submitComment" class="space-y-4">
      <!-- Name -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Name</label>
        <input
          v-model="form.author"
          type="text"
          placeholder="Your name"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span v-if="errors.author" class="text-red-500 text-sm">{{ errors.author }}</span>
      </div>

      <!-- Email -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="your@email.com"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
      </div>

      <!-- Comment -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Comment</label>
        <textarea
          v-model="form.content"
          placeholder="Share your thoughts..."
          rows="5"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span v-if="errors.content" class="text-red-500 text-sm">{{ errors.content }}</span>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        {{ isSubmitting ? 'Posting...' : 'Post Comment' }}
      </button>
    </form>

    <!-- Success Message -->
    <div v-if="showSuccess" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
      <p class="text-green-700 font-semibold">Comment posted successfully!</p>
    </div>
  </div>
</template>

<script setup>
import { useBlogStore } from '@/stores/blogStore'
import { ref } from 'vue'

const props = defineProps({
  postId: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['comment-added'])

const blogStore = useBlogStore()
const form = ref({
  author: '',
  email: '',
  content: '',
})
const errors = ref({})
const isSubmitting = ref(false)
const showSuccess = ref(false)

const validateForm = () => {
  errors.value = {}

  if (!form.value.author.trim()) {
    errors.value.author = 'Name is required'
  }

  if (!form.value.email.trim()) {
    errors.value.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Invalid email format'
  }

  if (!form.value.content.trim()) {
    errors.value.content = 'Comment is required'
  } else if (form.value.content.trim().length < 5) {
    errors.value.content = 'Comment must be at least 5 characters'
  }

  return Object.keys(errors.value).length === 0
}

const submitComment = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newComment = blogStore.addComment(props.postId, {
    author: form.value.author,
    email: form.value.email,
    content: form.value.content,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${form.value.author}`,
  })

  emit('comment-added', newComment)

  form.value = { author: '', email: '', content: '' }
  showSuccess.value = true
  isSubmitting.value = false

  setTimeout(() => {
    showSuccess.value = false
  }, 3000)
}
</script>
