<script setup>
const aboutText = `
  <p>
    <b>Lorem ipsum</b> dolor sit amet, consectetur adipisicing elit. <i>Dolor quis aliquam officia</i>,
    corrupti cumque quia neque ipsa saepe placeat unde modi eius dolorum nihil provident in,
    asperiores ipsum cupiditate repellendus odit perferendis labore. Inventore quo ut, beatae
    obcaecati impedit laboriosam laborum.
  </p>
  <p>
    <b>Lorem ipsum</b> dolor sit amet consectetur adipisicing elit. Maxime ut voluptatibus deserunt
    tempora cumque, hic doloribus et unde enim corporis nesciunt amet? Cumque quam rerum nam est
    quos perspiciatis odit ea omnis commodi aut voluptas impedit voluptatum blanditiis
    repudiandae perferendis doloremque, esse cupiditate hic quia quo iusto unde voluptates vero!
  </p>
`
</script>

<template>
  <section class="grid md:grid-cols-3">
    <div class="aspect-square border rounded-lg border-gray-300 flex justify-center items-center">
      <span class="text-4xl text-gray-300">Photo</span>
    </div>
    <div class="md:col-span-2 flex flex-col px-8 gap-4 justify-center items-center">
      <h1 class="font-bold lg:text-4xl text-3xl text-blue-900 leading-normal">About Us</h1>
      <div class="space-y-4 text-justify" v-html="aboutText"></div>
    </div>
  </section>
</template>
