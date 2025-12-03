<script setup>
import { ref } from 'vue'
import AboutSection from '@/components/common/AboutSection.vue';
import VideoPlayer from '@/components/VideoPlayer.vue';

const videos = ref([
  'https://www.youtube.com/watch?v=aIP8bN57v1E',
  'https://www.youtube.com/watch?v=3RmOvxilbPM',
  'https://www.youtube.com/watch?v=jjpjjcMeujM'
])

const index = ref(1)
</script>

<template>
  <AboutSection />
  <VideoPlayer 
    :videoUrl="videos[index]"
    @nextVideo="() => {index++}" 
    @previousVideo="() => {index--}"
  />
</template>
