<script setup>
import HeaderSection from '@/components/HeaderSection.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <HeaderSection />
  <main class="max-w-5xl mx-auto my-3 py-3 space-y-12">
    <RouterView />
  </main>
  <FooterSection />
</template>
