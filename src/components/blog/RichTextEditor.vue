<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <label class="block text-sm font-semibold text-gray-700 mb-2">{{ label }}</label>

    <!-- Toolbar -->
    <div class="flex flex-wrap gap-2 mb-4 p-3 bg-gray-100 rounded-lg border border-gray-300">
      <button
        @click="insertMarkdown('**', '**', 'bold')"
        title="Bold"
        class="p-2 hover:bg-gray-200 rounded transition-colors"
      >
        <strong>B</strong>
      </button>
      <button
        @click="insertMarkdown('*', '*', 'italic')"
        title="Italic"
        class="p-2 hover:bg-gray-200 rounded transition-colors"
      >
        <em>I</em>
      </button>
      <button
        @click="insertMarkdown('~~', '~~', 'strikethrough')"
        title="Strikethrough"
        class="p-2 hover:bg-gray-200 rounded transition-colors"
      >
        <s>S</s>
      </button>

      <div class="border-l border-gray-300 mx-1"></div>

      <button
        @click="insertMarkdown('# ', '\n', 'heading')"
        title="Heading"
        class="p-2 hover:bg-gray-200 rounded transition-colors text-sm font-bold"
      >
        H1
      </button>
      <button
        @click="insertMarkdown('## ', '\n', 'heading')"
        title="Subheading"
        class="p-2 hover:bg-gray-200 rounded transition-colors text-sm font-bold"
      >
        H2
      </button>

      <div class="border-l border-gray-300 mx-1"></div>

      <button
        @click="insertMarkdown('- ', '\n', 'list')"
        title="Bullet List"
        class="p-2 hover:bg-gray-200 rounded transition-colors"
      >
        • List
      </button>
      <button
        @click="insertMarkdown('1. ', '\n', 'list')"
        title="Numbered List"
        class="p-2 hover:bg-gray-200 rounded transition-colors"
      >
        1. List
      </button>

      <div class="border-l border-gray-300 mx-1"></div>

      <button
        @click="insertMarkdown('> ', '\n', 'quote')"
        title="Quote"
        class="p-2 hover:bg-gray-200 rounded transition-colors"
      >
        " Quote
      </button>
      <button
        @click="insertMarkdown('[Link](', ')', 'link')"
        title="Link"
        class="p-2 hover:bg-gray-200 rounded transition-colors"
      >
        🔗 Link
      </button>
    </div>

    <!-- Editor -->
    <textarea
      ref="editor"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      rows="10"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
    />

    <!-- Preview -->
    <div v-if="showPreview" class="mt-4">
      <h4 class="text-sm font-semibold text-gray-700 mb-2">Preview</h4>
      <div class="p-4 bg-gray-50 border border-gray-300 rounded-lg prose prose-sm max-w-none">
        <div v-html="renderMarkdown(modelValue)" />
      </div>
    </div>

    <!-- Toggle Preview -->
    <button
      @click="showPreview = !showPreview"
      class="mt-3 text-sm text-blue-600 hover:text-blue-800 font-semibold"
    >
      {{ showPreview ? '✕ Hide Preview' : '👁 Show Preview' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: 'Content',
  },
  placeholder: {
    type: String,
    default: 'Write your content here... Markdown supported!',
  },
})

defineEmits(['update:modelValue'])

const editor = ref(null)
const showPreview = ref(false)

const insertMarkdown = (before, after, type) => {
  if (!editor.value) return

  const textarea = editor.value
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = textarea.value.substring(start, end)
  const beforeText = textarea.value.substring(0, start)
  const afterText = textarea.value.substring(end)

  let newText
  if (selectedText) {
    newText = beforeText + before + selectedText + after + afterText
  } else {
    const placeholder = type === 'link' ? 'url' : 'text'
    newText = beforeText + before + placeholder + after + afterText
  }

  textarea.value = newText
  textarea.focus()
  textarea.selectionStart = start + before.length
  textarea.selectionEnd = start + before.length + (selectedText ? selectedText.length : 0)

  // Emit update
  const event = new Event('input', { bubbles: true })
  textarea.dispatchEvent(event)
}

const renderMarkdown = (markdown) => {
  if (!markdown) return ''

  let html = markdown
    // Headings
    .replace(/^### (.*?)$/gm, '<h3 class="text-lg font-bold">$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2 class="text-xl font-bold">$1</h2>')
    .replace(/^# (.*?)$/gm, '<h1 class="text-2xl font-bold">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Strikethrough
    .replace(/~~(.*?)~~/g, '<s>$1</s>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
    // Line breaks
    .replace(/\n/g, '<br>')

  return html
}
</script>
