import { watch } from 'vue'

export function useSeo(meta) {
  const updateMeta = (metaData) => {
    // Update title
    if (metaData.title) {
      document.title = metaData.title
    }

    // Update or create meta tags
    const updateOrCreateMeta = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    if (metaData.description) {
      updateOrCreateMeta('description', metaData.description)
    }

    if (metaData.keywords) {
      updateOrCreateMeta('keywords', metaData.keywords)
    }

    if (metaData.author) {
      updateOrCreateMeta('author', metaData.author)
    }

    // Update Open Graph tags
    const updateOrCreateOGTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    if (metaData.ogTitle) {
      updateOrCreateOGTag('og:title', metaData.ogTitle)
    }

    if (metaData.ogDescription) {
      updateOrCreateOGTag('og:description', metaData.ogDescription)
    }

    if (metaData.ogImage) {
      updateOrCreateOGTag('og:image', metaData.ogImage)
    }

    if (metaData.ogUrl) {
      updateOrCreateOGTag('og:url', metaData.ogUrl)
    }

    if (metaData.ogType) {
      updateOrCreateOGTag('og:type', metaData.ogType)
    }

    // Update Twitter Card tags
    const updateOrCreateTwitterTag = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    if (metaData.twitterCard) {
      updateOrCreateTwitterTag('twitter:card', metaData.twitterCard)
    }

    if (metaData.twitterTitle) {
      updateOrCreateTwitterTag('twitter:title', metaData.twitterTitle)
    }

    if (metaData.twitterDescription) {
      updateOrCreateTwitterTag('twitter:description', metaData.twitterDescription)
    }

    if (metaData.twitterImage) {
      updateOrCreateTwitterTag('twitter:image', metaData.twitterImage)
    }
  }

  // Watch for changes in meta data
  watch(() => meta, updateMeta, { deep: true, immediate: true })

  return {
    updateMeta,
  }
}
