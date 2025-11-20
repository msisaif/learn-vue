<template>
  <!-- BlogBreadcrumb -->
  <nav class="flex items-center gap-2 text-sm text-gray-600 mb-6">
    <RouterLink to="/" class="hover:text-blue-600">Home</RouterLink>
    <span>/</span>
    <RouterLink to="/blog" class="hover:text-blue-600">Blog</RouterLink>
    <span>/</span>
    <span class="text-gray-800 font-semibold">{{ title }}</span>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
