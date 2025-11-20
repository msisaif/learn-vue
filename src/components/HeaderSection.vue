<template>
  <header class="max-w-5xl mx-auto border-b py-2 flex justify-between border-gray-300">
    <RouterLink
      to="/"
      class="border uppercase font-semibold px-3 py-0.5 rounded bg-gray-200"
      aria-label="Logo - Go to home"
    >
      Logo
    </RouterLink>
    <nav class="flex justify-end gap-4" aria-label="Main navigation">
      <RouterLink to="/" aria-current="page">Home</RouterLink>
      <RouterLink to="/blog">Blog</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/contact">Contact</RouterLink>
      <RouterLink to="/admin/blog" class="text-blue-600 font-semibold">Admin</RouterLink>
    </nav>
  </header>
</template>
