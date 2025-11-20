<script setup lang="ts">
import ImageSlider from '../common/ImageSlider.vue'

const images = [
  'https://khanakhazana-msisaif.vercel.app/api/og?title=Hero 1',
  'https://khanakhazana-msisaif.vercel.app/api/og?title=Hero 2',
  'https://khanakhazana-msisaif.vercel.app/api/og?title=Hero 3',
]
</script>

<template>
  <section class="grid md:grid-cols-2">
    <div class="flex flex-col px-8 py-4 gap-4 justify-center items-center">
      <h1 class="font-bold lg:text-4xl text-3xl text-blue-900 leading-normal">
        জেনেসিস পরিবারে <br />
        আপনাকে স্বাগতম!
      </h1>
      <p class="text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
    </div>
    <div role="img" :aria-label="`Banner image showcase with ${images.length} images`">
      <ImageSlider :images="images" />
    </div>
  </section>
</template>
