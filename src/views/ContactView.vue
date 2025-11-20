<script setup>
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  message: '',
})
const errors = ref({})
const submitted = ref(false)
const isSubmitting = ref(false)

function validateForm() {
  errors.value = {}

  if (!formData.value.name?.trim()) {
    errors.value.name = 'Name is required'
  }

  if (!formData.value.email?.trim()) {
    errors.value.email = 'Email is required'
  } else if (!isValidEmail(formData.value.email)) {
    errors.value.email = 'Please enter a valid email address'
  }

  if (!formData.value.message?.trim()) {
    errors.value.message = 'Message is required'
  }

  return Object.keys(errors.value).length === 0
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

async function handleSubmit() {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log('Form submitted:', formData.value)
    submitted.value = true

    // Reset form after 3 seconds
    setTimeout(() => {
      submitted.value = false
      formData.value = { name: '', email: '', message: '' }
    }, 3000)
  } catch (error) {
    console.error('Form submission error:', error)
    errors.value.submit = 'Failed to submit form. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div>
    <h1 class="font-bold lg:text-4xl text-3xl text-blue-900 leading-normal text-center my-8">
      Contact Us
    </h1>

    <div class="max-w-2xl mx-auto p-4">
      <!-- Success Message -->
      <div
        v-if="submitted"
        class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg"
        role="alert"
      >
        <p class="font-semibold">✓ Thank you for your message!</p>
        <p>We'll get back to you as soon as possible.</p>
      </div>

      <!-- Form -->
      <form
        v-else
        @submit.prevent="handleSubmit"
        class="border rounded-lg border-gray-300 flex flex-col gap-4 p-4"
      >
        <!-- Submit Error -->
        <div
          v-if="errors.submit"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
          role="alert"
        >
          {{ errors.submit }}
        </div>

        <!-- Name Field -->
        <label class="flex flex-col gap-1">
          <span class="font-medium text-gray-700">
            Name
            <span class="text-red-500">*</span>
          </span>
          <input
            v-model="formData.name"
            type="text"
            class="border rounded-lg border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            :class="errors.name ? 'border-red-500' : 'border-gray-300'"
            placeholder="Your Name"
            aria-label="Name"
            :aria-invalid="!!errors.name"
            :aria-describedby="errors.name ? 'name-error' : null"
          />
          <span v-if="errors.name" id="name-error" class="text-red-500 text-sm">{{
            errors.name
          }}</span>
        </label>

        <!-- Email Field -->
        <label class="flex flex-col gap-1">
          <span class="font-medium text-gray-700">
            Email
            <span class="text-red-500">*</span>
          </span>
          <input
            v-model="formData.email"
            type="email"
            class="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            :class="errors.email ? 'border-red-500' : 'border-gray-300'"
            placeholder="Your Email"
            aria-label="Email"
            :aria-invalid="!!errors.email"
            :aria-describedby="errors.email ? 'email-error' : null"
          />
          <span v-if="errors.email" id="email-error" class="text-red-500 text-sm">{{
            errors.email
          }}</span>
        </label>

        <!-- Message Field -->
        <label class="flex flex-col gap-1">
          <span class="font-medium text-gray-700">
            Message
            <span class="text-red-500">*</span>
          </span>
          <textarea
            v-model="formData.message"
            class="border rounded-lg border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            :class="errors.message ? 'border-red-500' : 'border-gray-300'"
            rows="5"
            placeholder="Your Message"
            aria-label="Message"
            :aria-invalid="!!errors.message"
            :aria-describedby="errors.message ? 'message-error' : null"
          ></textarea>
          <span v-if="errors.message" id="message-error" class="text-red-500 text-sm">{{
            errors.message
          }}</span>
        </label>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isSubmitting"
          class="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          {{ isSubmitting ? 'Sending...' : 'Send Message' }}
        </button>
      </form>
    </div>
  </div>
</template>
