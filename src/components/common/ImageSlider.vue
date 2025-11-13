<script setup>
const props = defineProps({
  images: Array,
})

console.log(props.images)
</script>

<template>
  <div
    class="w-full aspect-video border rounded-lg border-gray-300 flex justify-center items-center relative"
  >
    <template v-for="(image, index) in images" :key="index">
      <span class="text-center text-gray-400 font-semibold px-3 py-1 rounded-lg bg-gray-100 mx-1">{{ image }}</span>
    </template>
    <span class="absolute left-2 top-1/2 -translate-y-1/2 text-4xl text-gray-300 cursor-pointer">
      &ll;
    </span>
    <span class="absolute right-2 top-1/2 -translate-y-1/2 text-4xl text-gray-300 cursor-pointer">
      &gg;
    </span>
  </div>
</template>
