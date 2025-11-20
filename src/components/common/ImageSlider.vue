<script setup>
import { ref } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
})

const currentIndex = ref(0)

function nextSlide() {
  if (props.images.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % props.images.length
  }
}

function prevSlide() {
  if (props.images.length > 0) {
    currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
  }
}
</script>

<template>
  <div
    class="relative w-full aspect-video border rounded-lg border-gray-300 overflow-hidden bg-gray-100"
  >
    <!-- Image Display -->
    <img
      v-if="images.length > 0"
      :src="images[currentIndex]"
      :alt="`Slide ${currentIndex + 1} of ${images.length}`"
      class="w-full h-full object-cover"
    />
    <div v-else class="w-full h-full flex justify-center items-center text-gray-400">
      <span class="text-center">No images available</span>
    </div>

    <!-- Navigation Buttons -->
    <button
      v-if="images.length > 1"
      @click="prevSlide"
      aria-label="Previous slide"
      class="absolute left-2 top-1/2 -translate-y-1/2 text-3xl text-white cursor-pointer hover:text-blue-400 transition z-10"
    >
      &#10216;
    </button>
    <button
      v-if="images.length > 1"
      @click="nextSlide"
      aria-label="Next slide"
      class="absolute right-2 top-1/2 -translate-y-1/2 text-3xl text-white cursor-pointer hover:text-blue-400 transition z-10"
    >
      &#10217;
    </button>

    <!-- Slide Indicators -->
    <div
      v-if="images.length > 1"
      class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10"
    >
      <button
        v-for="(_, index) in images"
        :key="index"
        @click="currentIndex = index"
        :aria-label="`Go to slide ${index + 1}`"
        :class="[
          'w-2 h-2 rounded-full transition',
          index === currentIndex ? 'bg-white' : 'bg-gray-400 hover:bg-gray-300',
        ]"
      />
    </div>

    <!-- Slide Counter -->
    <div
      v-if="images.length > 1"
      class="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm"
    >
      {{ currentIndex + 1 }} / {{ images.length }}
    </div>
  </div>
</template>
