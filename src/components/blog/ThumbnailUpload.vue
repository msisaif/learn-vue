<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <label class="block text-sm font-semibold text-gray-700 mb-2">Thumbnail</label>

    <div class="flex gap-6">
      <!-- Preview -->
      <div class="flex-shrink-0">
        <div
          v-if="preview"
          class="w-32 h-32 rounded-lg overflow-hidden bg-gray-200 border-2 border-gray-300"
        >
          <img :src="preview" :alt="altText" class="w-full h-full object-cover" />
        </div>
        <div
          v-else
          class="w-32 h-32 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center"
        >
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      <!-- Upload Area -->
      <div class="flex-1">
        <div
          @drop.prevent="handleDrop"
          @dragover.prevent
          class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer"
        >
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleFileSelect"
            class="hidden"
          />

          <button
            @click="$refs.fileInput.click()"
            type="button"
            class="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Click to upload
          </button>
          <p class="text-gray-500 text-sm mt-2">or drag and drop</p>
          <p class="text-gray-400 text-xs mt-1">PNG, JPG, GIF up to 5MB</p>
        </div>

        <!-- URL Input -->
        <div class="mt-4">
          <label class="block text-sm font-semibold text-gray-700 mb-2">Or paste image URL</label>
          <input
            v-model="imageUrl"
            @input="handleUrlInput"
            type="url"
            placeholder="https://example.com/image.jpg"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Clear Button -->
        <button
          v-if="preview"
          @click="clearImage"
          type="button"
          class="mt-4 text-red-600 hover:text-red-800 font-semibold text-sm"
        >
          Clear Image
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const fileInput = ref(null)
const preview = ref(props.modelValue)
const imageUrl = ref('')
const altText = ref('Thumbnail preview')

const handleFileSelect = (event) => {
  const file = event.target.files?.[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      preview.value = e.target.result
      emit('update:modelValue', e.target.result)
      imageUrl.value = ''
    }
    reader.readAsDataURL(file)
  }
}

const handleDrop = (event) => {
  const file = event.dataTransfer.files?.[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      preview.value = e.target.result
      emit('update:modelValue', e.target.result)
      imageUrl.value = ''
    }
    reader.readAsDataURL(file)
  }
}

const handleUrlInput = () => {
  if (imageUrl.value) {
    preview.value = imageUrl.value
    emit('update:modelValue', imageUrl.value)
  }
}

const clearImage = () => {
  preview.value = ''
  imageUrl.value = ''
  emit('update:modelValue', '')
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>
