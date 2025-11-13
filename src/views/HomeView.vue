<script setup>
import AboutSection from '@/components/common/AboutSection.vue'
import ImageSlider from '@/components/common/ImageSlider.vue'
import HeroSection from '@/components/home/HeroSection.vue'

const images = ['photo-1.jpg', 'photo-2.jpg']

</script>

<template>
  <HeroSection v-for="n in 2" :key="n" />
  <AboutSection />
  <section>
    <h1 class="font-bold lg:text-4xl text-3xl text-blue-900 leading-normal text-center">
      Testimonial
    </h1>
    <div class="flex max-w-xl mx-auto justify-center items-center p-4">
      <ImageSlider :images="images" />
    </div>
  </section>
</template>
