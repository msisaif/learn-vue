<script setup></script>

<template>
  <div>
    <h1 class="font-bold lg:text-4xl text-3xl text-blue-900 leading-normal text-center my-8">
      Contact Us
    </h1>
    <div class="max-w-2xl mx-auto p-4 border rounded-lg border-gray-300 flex flex-col gap-4">
      <label class="flex flex-col gap-1">
        <span class="font-medium text-gray-700">Name</span>
        <input
          type="text"
          class="border rounded-lg border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your Name"
        />
      </label>
      <label class="flex flex-col gap-1">
        <span class="font-medium text-gray-700">Email</span>
        <input
          type="email"
          class="border rounded-lg border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your Email"
        />
      </label>
      <label class="flex flex-col gap-1">
        <span class="font-medium text-gray-700">Message</span>
        <textarea
          class="border rounded-lg border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="5"
          placeholder="Your Message"
        ></textarea>
      </label>
      <button
        class="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Send Message
      </button>
    </div>
  </div>
</template>
