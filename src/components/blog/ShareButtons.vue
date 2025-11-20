<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-8">
    <h3 class="text-lg font-bold text-gray-800 mb-4">Share This Post</h3>

    <div class="flex flex-wrap gap-3">
      <!-- Facebook -->
      <a
        :href="`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
          />
        </svg>
        Facebook
      </a>

      <!-- Twitter -->
      <a
        :href="`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition-colors"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M23.953 4.57a10 10 0 002.856-3.586c-1.04.464-2.16.766-3.322.766a5.734 5.734 0 002.503-3.102 11.36 11.36 0 01-3.622 1.39 5.738 5.738 0 00-9.927 5.228c-4.783-.285-9.03-2.533-11.88-6.02a5.7 5.7 0 001.776 7.66 5.7 5.7 0 01-2.6-.717v.072c0 2.783 1.979 5.1 4.6 5.627a5.73 5.73 0 01-2.593.1 5.74 5.74 0 005.36 3.984 11.52 11.52 0 01-7.12 2.46c-.46 0-.92-.028-1.366-.084a16.175 16.175 0 008.757 2.564c10.507 0 16.24-8.7 16.24-16.24 0-.248-.005-.495-.014-.74a11.59 11.59 0 002.84-2.94z"
          />
        </svg>
        Twitter
      </a>

      <!-- LinkedIn -->
      <a
        :href="`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.81 0-9.728h3.554v1.375c.427-.659 1.191-1.595 2.897-1.595 2.117 0 3.704 1.385 3.704 4.362v5.586zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.707 0-.951.77-1.708 1.971-1.708 1.2 0 1.914.757 1.914 1.708 0 .949-.715 1.707-1.97 1.707zm1.946 11.597h-3.554v-9.728h3.554v9.728zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
          />
        </svg>
        LinkedIn
      </a>

      <!-- Copy Link -->
      <button
        @click="copyLink"
        class="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
        {{ copyText }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})

const copyText = ref('Copy Link')

const encodedUrl = computed(() => encodeURIComponent(props.url))
const encodedTitle = computed(() => encodeURIComponent(props.title))

const copyLink = async () => {
  await navigator.clipboard.writeText(props.url)
  copyText.value = 'Copied!'
  setTimeout(() => {
    copyText.value = 'Copy Link'
  }, 2000)
}
</script>
