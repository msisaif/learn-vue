import blogsData from '@/data/blogs.json'
import categoriesData from '@/data/categories.json'
import commentsData from '@/data/comments.json'
import tagsData from '@/data/tags.json'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useBlogStore = defineStore('blog', () => {
  // State
  const blogs = ref(blogsData)
  const categories = ref(categoriesData)
  const tags = ref(tagsData)
  const comments = ref(commentsData)
  const searchQuery = ref('')
  const selectedCategory = ref(null)
  const selectedTags = ref([])
  const currentPage = ref(1)
  const itemsPerPage = ref(6)

  // Computed
  const filteredBlogs = computed(() => {
    let result = blogs.value

    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query) ||
          blog.excerpt.toLowerCase().includes(query) ||
          blog.content.toLowerCase().includes(query),
      )
    }

    // Filter by category
    if (selectedCategory.value) {
      result = result.filter((blog) => blog.category === selectedCategory.value)
    }

    // Filter by tags
    if (selectedTags.value.length > 0) {
      result = result.filter((blog) => selectedTags.value.some((tag) => blog.tags.includes(tag)))
    }

    return result
  })

  const paginatedBlogs = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredBlogs.value.slice(start, end)
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredBlogs.value.length / itemsPerPage.value)
  })

  // Methods
  function getBlogBySlug(slug) {
    return blogs.value.find((blog) => blog.slug === slug)
  }

  function getRelatedPosts(slug, limit = 3) {
    const blog = getBlogBySlug(slug)
    if (!blog) return []

    return blogs.value
      .filter((b) => b.slug !== slug && b.category === blog.category)
      .slice(0, limit)
  }

  function getCommentsByPostId(postId) {
    return comments.value.filter((comment) => comment.postId === postId)
  }

  function addComment(postId, commentData) {
    const newComment = {
      id: Math.max(...comments.value.map((c) => c.id), 0) + 1,
      postId,
      ...commentData,
      date: new Date().toISOString().split('T')[0],
      replies: [],
    }
    comments.value.push(newComment)
    return newComment
  }

  function addReply(commentId, replyData) {
    const comment = comments.value.find((c) => c.id === commentId)
    if (comment) {
      const newReply = {
        id:
          Math.max(...comments.value.flatMap((c) => [c.id, ...c.replies.map((r) => r.id)]), 0) + 1,
        ...replyData,
        date: new Date().toISOString().split('T')[0],
      }
      comment.replies.push(newReply)
      return newReply
    }
  }

  function setSearchQuery(query) {
    searchQuery.value = query
    currentPage.value = 1
  }

  function setSelectedCategory(category) {
    selectedCategory.value = category
    currentPage.value = 1
  }

  function toggleTag(tag) {
    const index = selectedTags.value.indexOf(tag)
    if (index > -1) {
      selectedTags.value.splice(index, 1)
    } else {
      selectedTags.value.push(tag)
    }
    currentPage.value = 1
  }

  function clearFilters() {
    searchQuery.value = ''
    selectedCategory.value = null
    selectedTags.value = []
    currentPage.value = 1
  }

  function setCurrentPage(page) {
    currentPage.value = Math.max(1, Math.min(page, totalPages.value))
  }

  function addBlog(blogData) {
    const newBlog = {
      id: Math.max(...blogs.value.map((b) => b.id), 0) + 1,
      ...blogData,
      publishDate: new Date().toISOString().split('T')[0],
      views: 0,
      comments: 0,
    }
    blogs.value.unshift(newBlog)
    return newBlog
  }

  function updateBlog(id, blogData) {
    const index = blogs.value.findIndex((b) => b.id === id)
    if (index > -1) {
      blogs.value[index] = { ...blogs.value[index], ...blogData }
      return blogs.value[index]
    }
  }

  function deleteBlog(id) {
    const index = blogs.value.findIndex((b) => b.id === id)
    if (index > -1) {
      blogs.value.splice(index, 1)
      return true
    }
    return false
  }

  return {
    // State
    blogs,
    categories,
    tags,
    comments,
    searchQuery,
    selectedCategory,
    selectedTags,
    currentPage,
    itemsPerPage,

    // Computed
    filteredBlogs,
    paginatedBlogs,
    totalPages,

    // Methods
    getBlogBySlug,
    getRelatedPosts,
    getCommentsByPostId,
    addComment,
    addReply,
    setSearchQuery,
    setSelectedCategory,
    toggleTag,
    clearFilters,
    setCurrentPage,
    addBlog,
    updateBlog,
    deleteBlog,
  }
})
