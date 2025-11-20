<template>
  <div class="min-h-96 flex flex-col items-center justify-center text-center py-12">
    <h1 class="text-6xl font-bold text-blue-900 mb-4">404</h1>
    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
    <p class="text-gray-600 mb-8 max-w-md">
      Sorry, the page you're looking for doesn't exist or has been moved.
    </p>
    <RouterLink
      to="/"
      class="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      Go Back Home
    </RouterLink>
  </div>
</template>
