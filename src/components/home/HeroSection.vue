<script setup lang="ts">
import ImageSlider from '../common/ImageSlider.vue'

const images = ['banner-1.jpg', 'banner-2.jpg']
</script>

<template>
  <section class="grid md:grid-cols-2">
    <div class="flex flex-col px-8 py-4 gap-4 justify-center items-center">
      <h1 class="font-bold lg:text-4xl text-3xl text-blue-900 leading-normal">
        জেনেসিস পরিবারে <br />
        আপনাকে স্বাগতম!
      </h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
    </div>
    <ImageSlider :images />
  </section>
</template>
